import { Button, Form, Input, message } from "antd";
import { useLogin } from "./service/mutation/useLogin";
import Cookies from "js-cookie";
import { loginType } from "./service/mutation/loginType";

export const Login = () => {
  const { mutate } = useLogin();

  const submit = (data: loginType): void => {
    console.log(data);
    
    mutate(data, {
      onSuccess: (res: string) => {
        message.error("XATO!");
        Cookies.set("Token", res);
      },
    });
  };
  return (
    <>
      <Form  onFinish={submit}>
        <Form.Item name={"phone_number"}>
          <Input placeholder="phone_number" size="large" />
        </Form.Item>
        <Form.Item name={"password"}>
          <Input.Password placeholder="password" size="large" />
        </Form.Item>
        <Form.Item>
          <Button htmlType="submit" type="primary" variant="outlined">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};
