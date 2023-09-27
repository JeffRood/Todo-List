import './ModalView.css'

const ModalView = ({isVisible, children} : any) => {

    if (!isVisible) return;
    
  return (
    <section className='modal_container'>
        {children}
    </section>
  )
}

export default ModalView
