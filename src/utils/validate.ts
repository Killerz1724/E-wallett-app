function validate(name: string, value: string) {
  const emailRegex: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  let error = "";
  if (name === "email") {
    if (!emailRegex.test(value)) {
      error = "Please enter a valid email address";
    }
  }

  if (name === "password") {
    if (value.length <= 5) {
      error = "Password must be at least 6 characters long";
    }
  }
}
