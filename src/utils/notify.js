import toast from "react-hot-toast/headless";

const notifyTypeFunctionMap = {
    success: toast.success,
    error: toast.error,
    info: toast,
};

export default function notify(type, message) {
    const notifyFunction = notifyTypeFunctionMap[type];
    notifyFunction(message);
}
