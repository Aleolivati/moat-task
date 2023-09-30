type PropsBg = {
  paddingLarge?: boolean
  modal?: boolean
  children: JSX.Element
}

const BgContainer = ({ children, paddingLarge = true, modal = false }: PropsBg) => (
  <div className='row col-11 col-sm-9 col-lg-7 col-xl-6'>
    <div
      className={`bg-purple rounded-3 text-center mb-4 position-relative ${
        paddingLarge ? 'pt-5 pb-5 p-sm-5' : 'pt-2 pb-2'
      } ${modal ? 'bg-purple--modal' : ''}`}
    >
      {children}
    </div>
  </div>
)

export default BgContainer
