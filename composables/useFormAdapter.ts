interface AppFormProvide {
  errors: Ref<{ [key: string]: string }>;
  updateField: (name: string, newValue: string) => void;
}

export const useFormAdapter = (name: string, value: string) => {
  const field = useState(() => value)

  const { errors, updateField } = inject<AppFormProvide>(
    "appForm"
  ) as AppFormProvide;

  const error = computed(() => errors[name])
  

  watchEffect(() => {
    updateField(name, field.value);
  });

  return {
    error,
    field
  }
}