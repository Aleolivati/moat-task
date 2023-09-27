type PropsButton = {
  title?: string
  icon?: string
  type?: 'button' | 'submit' | 'reset' | undefined
  role: 'button' | 'crud'
  onClick?: () => void
}

const Button = ({ title, icon, role, type, onClick }: PropsButton) => {
  if (role === 'button') {
    return (
      <button
        className='col-11 col-sm-9 col-xl-7 btn btn-outline-light mb-2'
        type={type}
        onClick={onClick}
      >
        {title}
      </button>
    )
  }
  if (role === 'crud') {
    return (
      <button className='col-2 h-25 btn btn-outline-light mb-2'>
        <img src={icon} alt='Icon' />
      </button>
    )
  }
  return <h3>Attention! Button type not found!</h3>
}

export default Button
