import { toast } from "react-toastify";

export const notify = (message, type = "info") => {
  const configs = {
    position: "bottom-center",
    theme: "dark",
  };
  switch (type) {
    case "info":
      return toast.info(message, configs);
    case "success":
      return toast.success(message, configs);
    case "loading":
      return toast.loading(message, configs);
    case "error":
      return toast.error(message, configs);
  }
};

export const notifyDismiss = (toastInstance, delay = 0.5) => {
  return setTimeout(() => {
    toast.dismiss(toastInstance);
  }, 1000 * delay);
};
