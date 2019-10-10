import 'antd/dist/antd.css';
import { Modal } from "antd";
export function success(msg) {
  let secondsToGo = 2;
  const modal = Modal.success({
    title: msg
  });
  const timer = setInterval(() => {
    secondsToGo -= 1;
    modal.update({});
  }, 1000);
  setTimeout(() => {
    clearInterval(timer);
    modal.destroy();
  }, secondsToGo * 1000);
};
