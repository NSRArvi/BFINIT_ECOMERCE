import toast from "react-hot-toast";

export const editorLinkClick = (e) => {
  e.preventDefault();
  toast("This page isn't editable yet");
};
