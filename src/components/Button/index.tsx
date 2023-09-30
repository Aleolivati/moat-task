import { MdLibraryAdd as AddIcon, MdEdit as EditIcon, MdDelete as DeleteIcon, MdSaveAs as SaveIcon, MdCancel as CancelIcon } from 'react-icons/md'

type PropsButton = {
  title?: string
  icon?: 'add' | 'edit' | 'delete' | 'save' | 'cancel'
  type?: 'button' | 'submit' | 'reset' | undefined
  roleOf: 'button' | 'crud'
  onClick?: () => void
}

const Button = ({ title, icon, roleOf, type, onClick }: PropsButton) => {
  if (roleOf === 'button') {
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
  if (roleOf === 'crud') {
    return (
      <button className={`col-2 btn btn-outline-light d-flex align-items-center mb-2 rounded-5 w-auto ${icon === 'add' && 'bg-success'}`} onClick={onClick}>
        <>
          {icon === 'add' && <AddIcon />}
          {icon === 'delete' && <DeleteIcon />}
          {icon === 'edit' && <EditIcon />}
          {icon === 'save' && <SaveIcon />}
          {icon === 'cancel' && <CancelIcon />}
        </>
      </button>
    )
  }
  return <h3>Attention! Button type not found!</h3>
}

export default Button
