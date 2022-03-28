import { useState, useEffect } from 'react'
import styled from '@emotion/styled'
import { useSelectMonedas } from '../hooks/useSelectMonedas'
import { monedas } from '../data/monedas'

const InputSubmit = styled.input`
background-color: #9497ff;
border: none;
width: 100%;
padding: 10px;
color: #fff;
font-weight: 700;
text-transform: uppercase;
font-size: 20px;
border-radius: 5px;
transition: background-color .3s ease;
margin-top: 20px;

&:hover{
  background-color: #7a7dfe;
  cursor: pointer;
}
`

export const Formulario = () => {
  const [cryptos, setCryptos] = useState([])
  const [moneda, SelectMonedas] = useSelectMonedas('Selecciona tu moneda', monedas)
  const [cryptomoneda, SelectCryptomonedas] = useSelectMonedas('Selecciona tu Cryptomoneda', cryptos)

  useEffect(() => {
    const consultarAPI = async () => {
      const url = 'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD'

      const respuesta = await window.fetch(url)
      const resultado = await respuesta.json()

      const arrayCryptos = resultado.Data.map(crypto => {
        const objeto = {
          id: crypto.CoinInfo.Name,
          nombre: crypto.CoinInfo.FullName
        }
        return objeto
      })
      setCryptos(arrayCryptos)
    }
    consultarAPI()
  }, [])
  return (
    <form>
      <SelectMonedas />
      <SelectCryptomonedas />
      <InputSubmit
        type='submit'
        value='cotizar'
      />
    </form>
  )
}
