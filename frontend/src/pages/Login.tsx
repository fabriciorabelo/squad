import { FormEvent, useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { Button, Card, CardBody, Col, Form, FormGroup, Input, Label, Row } from "reactstrap";
import { SITE_NAME } from "../configs/constants";
import useAuth from "../hooks/auth";
import LoginLayout from "../layouts/LoginLayout";
import SweetAlert from "sweetalert2";

export default function Login() {
  const { login } = useAuth();
  const history = useHistory();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [remember, setRemember] = useState<boolean>(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!email.trim() || !password.trim()) {
      SweetAlert.fire({
        title: "Erro",
        icon: "error",
        text: "Usuário e senha são obrigatórios.",
      });
      return;
    }

    await login(email, password, remember)
      .then(res => {
        if (res) history.push("/");
      })
      .catch(err => {
        console.log(err);
      });
  }

  useEffect(() => {
    document.title = `${SITE_NAME} :: Login`;
  }, []);

  return (
    <LoginLayout>
      <Card className="o-hidden border-0 shadow-lg my-5">
        <CardBody className="p-0">
          <Row>
            <Col lg="6" className="d-none d-lg-block bg-login-image"></Col>
            <Col lg="6">
              <div className="p-5">
                <div className="text-center">
                  <h1 className="h4 text-gray-900 mb-4">Bem-vindo de volta!</h1>
                </div>
                <Form className="user" onSubmit={handleSubmit}>
                  <FormGroup>
                    <Label for="email">E-mail</Label>
                    <Input
                      type="email"
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="form-control-user"
                      placeholder="Digite seu e-mail.."
                      required
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label for="email">Senha</Label>
                    <Input
                      type="password"
                      id="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="form-control-user"
                      placeholder="Digite sua senha.."
                      required
                    />
                  </FormGroup>
                  <FormGroup>
                    <div className="custom-control custom-checkbox small">
                      <Input
                        type="checkbox"
                        checked={remember}
                        onChange={(e) => setRemember(e.target.checked)}
                        className="custom-control-input" id="remember" />
                      <Label
                        for="remember"
                        className="custom-control-label">
                        Lembre-me
                      </Label>
                    </div>
                  </FormGroup>
                  <Button
                    type="submit"
                    color="primary"
                    className="btn-user"
                    block
                  >
                    Entrar
                  </Button>
                </Form>
                <div className="d-none">
                  <hr />
                  <div className="text-center">
                    <Link
                      to="/forgot-password"
                      className="small"
                    >
                      Esqueceu sua senha?
                  </Link>
                  </div>
                  <div className="text-center">
                    <Link to="/register" className="small">Cadastre-se</Link>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </CardBody>
      </Card>
    </LoginLayout>
  );
}