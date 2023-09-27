type PropsBg = {
  paddingLarge?: boolean
  children: JSX.Element
}

const BgContainer = ({ children, paddingLarge = true }: PropsBg) => (
  <div className='row col-11 col-sm-9 col-lg-7 col-xl-6'>
    <div
      className={
        paddingLarge
          ? 'bg-purple rounded-3 text-center mb-4 pt-5 pb-5 p-sm-5'
          : 'bg-purple rounded-3 text-center mb-4 pt-2 pb-2'
      }
    >
      {children}
    </div>
  </div>
)

export default BgContainer
