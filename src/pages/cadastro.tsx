import { useEffect, useState } from 'react'
import { Button, Col, Container, Form, Row } from 'react-bootstrap'

import { state, banks } from '../data'

import { useForm, SubmitHandler } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

import { api } from '../services'
import { useDebounce } from '../hook/useDebounce'

interface UserSubmitForm {
  nome: string
  rg: number
  cpf: string
  email: string
  emailCorporativo: string
  telefone1: string
  telefone2: string
  nome_fantasia: string
  razao_social: string
  cnpj: string
  cep: string
  message: string
  endereco: string
  bairro: string
  cidade: string
}

const validadationSchema = yup.object().shape({
  // nome: yup.string().required('Campo obrigatório!'),
  // rg: yup
  //   .string()
  //   .required('Campo obrigatório!')
  //   .min(9, 'No mínimo 9 caracteres')
  //   .max(9, 'No maximo 9 caracteres'),
  // cpf: yup.string().required('Campo obrigatório!'),
  // cep: yup.string().required('campo obrigatório!'),
  // email: yup.string().required('Campo obrigatório!').email('E-mail inválido'),
  // telefone1: yup.string().required('Campo obrigatório!'),
  // telefone2: yup.string().required('Campo obrigatório!')
})

export default function Cadastro() {

  const { register, handleSubmit, formState, watch } = useForm<UserSubmitForm>({
    resolver: yupResolver(validadationSchema)
  })

  //console.log('REGISTER',register.name);


  const { errors } = formState
  console.log('HERE', errors)

  const handleForm: SubmitHandler<UserSubmitForm> = async (values) => {
    await new Promise(resolve => setTimeout(resolve, 2000))
    console.log('VALUE', values)
  }

  const [disabled, setDisabled] = useState(true);
  const { cep } = watch();
  console.log('CEP', cep);

  //const debouncedChange = useDebounce(onchange, 2000)

  //const [logradouro, setLogradouro] = useState('');
  //const [bairro, setBairro] = useState('');
  //const [localidade, setLocalidade] = useState('');

  const handleGetInputValue = async () => {
    const response = await api.get(`${cep}/json`)
    const data = await response.data
    console.log('DATA HERE', data);
    //setLogradouro(data.logradouro)
    //setBairro(data.bairro)
    //setLocalidade(data.localidade)    
  }

  useEffect(() => {
    if (cep) {
      handleGetInputValue()
    }
  }, [cep])



  return (
    <>
      <Container>
        <Row className="justify-content-md-center mt-5">
          <Col className="col-sm-12 col-md-6 mb-3 pb-2">
            <Form onSubmit={handleSubmit(handleForm)}>
              <div>
                <h4>CADASTRE-SE</h4>
              </div>
              <div className="mt-5 mb-5">
                <div className="col-sm-12 col-md-6">
                  <h4 className="pt-3 pb-2">SOBRE VOCÊ</h4>
                </div>
              </div>
              <div className="form-floating mb-3">
                <input
                  type="text"
                  className={`form-control ${errors.nome ? 'is-invalid' : ''}`}
                  id="floatingInput"
                  placeholder="Seu nome"
                  {...register('nome')}
                />
                <p className="invalid-feedback">{errors.nome?.message}</p>
                <label htmlFor="floatingInput">Seu nome</label>
              </div>
              <div className="form-floating mb-3">
                <input
                  type="text"
                  className={`form-control ${errors.rg ? 'is-invalid' : ''}`}
                  id="floatingInput"
                  placeholder="RG"
                  {...register('rg')}
                />
                <p className="invalid-feedback">{errors.rg?.message}</p>
                <label htmlFor="floatingInput">RG</label>
              </div>
              <div className="form-floating mb-3">
                <input
                  type="text"
                  name="cpf"
                  className={`form-control ${errors.cpf ? 'is-invalid' : ''}`}
                  id="floatingInput"
                  placeholder="000.000.000-00"
                  {...register('cpf')}
                />
                <p className="invalid-feedback">{errors.cpf?.message}</p>
                <label htmlFor="floatingInput">CPF</label>
              </div>
              <div className="form-floating mb-3">
                <input
                  type="email"
                  name="emailCorporativo"
                  className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                  id="floatingInput"
                  placeholder="E-mail corporativo"
                  {...register('emailCorporativo')}
                />
                <p className="invalid-feedback">{errors.email?.message}</p>
                <label htmlFor="floatingInput">E-mail corporativo</label>
              </div>
              <div className="form-floating mb-3">
                <input
                  type="tel"
                  name="telefone1"
                  className={`form-control ${errors.telefone1 ? 'is-invalid' : ''}`}
                  id="floatingInput"
                  placeholder="Telefone"
                  {...register('telefone1')}
                />
                <p className="invalid-feedback">{errors.telefone1?.message}</p>
                <label htmlFor="floatingInput">Telefone</label>
              </div>
              <div className="mt-5 mb-5">
                <div className="col-sm-12 col-md-6">
                  <h4 className="pt-3 pb-2">SOBRE A IMOBILIÁRIA</h4>
                </div>
              </div>
              <div className="form-floating mb-3">
                <input
                  type="text"
                  name="nomeFantasia"
                  className={`form-control ${errors.nome_fantasia ? 'is-invalid' : ''}`}
                  id="floatingInput"
                  placeholder="Nome fantasia"
                  {...register('nome_fantasia')}
                />
                <p className="invalid-feedback">{errors.nome_fantasia?.message}</p>
                <label htmlFor="floatingInput">Nome fantasia</label>
              </div>
              <div className="form-floating mb-3">
                <input
                  type="text"
                  name="razaoSocial"
                  className={`form-control ${errors.razao_social ? 'is-invalid' : ''}`}
                  id="floatingInput"
                  placeholder="Razão social"
                  {...register('razao_social')}
                />
                <p className="invalid-feedback">{errors.razao_social?.message}</p>
                <label htmlFor="floatingInput">Razão social</label>
              </div>
              <div className="form-floating mb-3">
                <input
                  type="text"
                  name="cnpj"
                  className={`form-control ${errors.cnpj ? 'is-invalid' : ''}`}
                  id="floatingInput"
                  placeholder="CNPJ"
                  {...register('cnpj')}
                />
                <p className="invalid-feedback">{errors.cnpj?.message}</p>
                <label htmlFor="floatingInput">CNPJ</label>
              </div>
              <div className="form-floating mb-3">
                <input
                  type="text"
                  name="email"
                  className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                  id="floatingInput"
                  placeholder="E-mail"
                  {...register('email')}
                />
                <p className="invalid-feedback">{errors.email?.message}</p>
                <label htmlFor="floatingInput">E-mail</label>
              </div>
              <div className="form-floating mb-3">
                <input
                  type="tel"
                  name="telefone2"
                  className={`form-control ${errors.telefone2 ? 'is-invalid' : ''}`}
                  id="floatingInput"
                  placeholder="Telefone"
                  {...register('telefone2')}
                />
                <p className="invalid-feedback">{errors.telefone2?.message}</p>
                <label htmlFor="floatingInput">Telefone</label>
              </div>
              <div className="mt-5 mb-5">
                <div className="col-sm-12">
                  <h4 className="pt-3 m-0">ENDEREÇO COMPLETO</h4>
                  <p>Da imobiliária</p>
                </div>
              </div>
              <div className="form-floating mb-3">
                <input
                  type="text"
                  name="cep"
                  className={`form-control ${errors.cep ? 'is-invalid' : ''}`}
                  id="floatingInput"
                  placeholder="CEP"
                  {...register('cep')}
                />
                <p className="invalid-feedback">{errors.cep?.message}</p>
                <label htmlFor="floatingInput">CEP</label>
              </div>
              <Row className="justify-content-md-center mt-5">
                <Col className="col-md-8 mb-3 pb-2">
                  <div className="form-floating ">
                    <input
                      type="text"
                      name="endereco"
                      className="form-control"
                      id="floatingInput"
                      placeholder="Rua"
                      {...register('endereco')}
                    />
                    <label htmlFor="floatingInput">Rua</label>
                  </div>
                </Col>
                <Col className="col-md-4 mb-3 pb-2">
                  <div className="form-floating">
                    <input
                      type="text"
                      name="numero"
                      className="form-control"
                      id="floatingInput"
                      placeholder="Nº"
                    />
                    <label htmlFor="floatingInput">N°</label>
                  </div>
                </Col>
              </Row>
              <div className="form-floating mb-3">
                <input
                  type="text"
                  name="bairro"
                  className="form-control"
                  id="floatingInput"
                  placeholder="Bairro"
                  {...register('bairro')}
                />
                <label htmlFor="floatingInput">Bairro</label>
              </div>
              <div className="form-floating mb-3">
                <input
                  type="text"
                  name="cidade"
                  className="form-control"
                  id="floatingInput"
                  placeholder="Cidade"
                  {...register('cidade')}
                />
                <label htmlFor="floatingInput">Cidade</label>
              </div>
              <div className="form-floating">
                <select
                  className="form-select"
                  id="floatingSelect"
                  aria-label="Floating label select example"
                >
                  <option value=""></option>
                  {state.map(item => (
                    <option key={item.key} value="">{item.label}</option>
                  ))}
                </select>
                <label htmlFor="floatingSelect">Estado</label>
              </div>
              <div className="mt-5 mb-5">
                <div className="col-sm-12">
                  <h4 className="pt-3 m-0">INFORMAÇÕES FISCAIS</h4>
                </div>
              </div>
              <div className="form-floating mb-3">
                <input
                  type="text"
                  className="form-control"
                  id="floatingInput"
                  placeholder="Inscrição municipal "
                />
                <label htmlFor="floatingInput">Inscrição municipal </label>
              </div>
              <div className="form-floating">
                <select
                  className="form-select"
                  id="floatingSelect"
                  aria-label="Floating label select example"
                >
                  <option value="1">One</option>
                  <option value="2">Two</option>
                  <option value="3">Three</option>
                </select>
                <label htmlFor="floatingSelect">Estado</label>
              </div>
              <div className="mt-5 mb-5">
                <div className="col-sm-12">
                  <h4 className="pt-3 m-0">CONTA BANCÁRIA</h4>
                  <p>
                    Conta (Pessoa Jurídica) que as suas comissões serão
                    depositadas.
                  </p>
                </div>
              </div>
              <div className="form-floating">
                <select
                  className="form-select"
                  id="floatingSelect"
                  aria-label="Floating label select example"
                >
                  <option value=""></option>
                  {banks.map(item => (
                    <option key={item.key} value="">{item.label}</option>
                  ))}

                </select>
                <label htmlFor="floatingSelect">Banco</label>
              </div>
              <Row className="mt-2">
                <Col>
                  <div className="form-floating mb-3">
                    <input
                      type="text"
                      name="agencia"
                      className="form-control"
                      id="floatingInput"
                      placeholder="Agência"
                    />
                    <label htmlFor="floatingInput">Agência</label>
                  </div>
                </Col>

                <Col>
                  <div className="form-floating mb-3">
                    <input
                      type="text"
                      name="conta"
                      className="form-control"
                      id="floatingInput"
                      placeholder="Conta"
                    />
                    <label htmlFor="floatingInput">Conta</label>
                  </div>
                </Col>

                <Col>
                  <div className="form-floating mb-3">
                    <input
                      type="text"
                      name="digito"
                      className="form-control"
                      id="floatingInput"
                      placeholder="Dígito"
                    />
                    <label htmlFor="floatingInput">Dígito</label>
                  </div>
                </Col>
              </Row>
              <div className="form-check mt-3">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="flexCheckDefault"
                  onClick={() => setDisabled(!disabled)}
                />
                <label className="form-check-label" htmlFor="flexCheckDefault">
                  Li e aceito os
                  <a
                    className="text-primary m-2"
                    href="termsUrl"
                    target="_blank"
                  >
                    termos de serviço
                  </a>
                </label>
              </div>
              <div className="d-grid gap-2 mt-3">
                <Button
                  title="Enviar"
                  type="submit"
                  className="rounded-pill"
                  variant="primary"
                  size="lg"
                  disabled={disabled}
                >
                  Enviar
                </Button>
              </div>
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  )
}

