import Link from 'react-router-dom'

function NotFoundPage() {
  return (
    <div>
      <h1>Error 404 - Página no encontrada</h1>
      <Link to={"/"}>
        <buttom>Volver al inicio</buttom>
      </Link>
    </div>
  )
}

export default NotFoundPage
