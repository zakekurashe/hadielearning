import { useEffect, useState } from 'react';

const useForm = (initialValues) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});


  useEffect(() => {
    setValues(initialValues);
  }, [initialValues]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value
    });
  };

  const handleFileChange = (info) => {
    // Ensure that the file is available and has an originFileObj
    const file = info.file.originFileObj || info.file;

    if (!file) {
      setErrors({ ...errors, icon: 'No file selected' });
      setValues({ ...values, icon: null });
      return;
    }

    // File size check
    if (file.size > 1024 * 1024 * 1) { // 1MB limit
      setErrors({ ...errors, icon: 'File size should be less than 1MB' });
      setValues({ ...values, icon: null });
    } else {
      setErrors({ ...errors, icon: '' });
      setValues({
        ...values,
        icon: file
      });
    }
  };

  const resetForm = () => {
    setValues(initialValues);
    setErrors({});
  };

  return { values, setValues, errors, handleChange, handleFileChange, resetForm };
};

export default useForm;
