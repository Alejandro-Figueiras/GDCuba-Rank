const SubmitResult = ({submitResult = 0}) => {
  const img = (submitResult>0)
    ? '/assets/ui/success.png'
    : '/assets/ui/delete.png'

  const message = 
  (submitResult==1) ? 'Record Enviado. Para finalizar el proceso de publicación un moderador debe verificar su veracidad.' :
  (submitResult==2) ? 'Se encontró un record anterior en el mismo nivel. El record se actualizó, pero su veracidad deberá ser reverificada por un moderador' :
  (submitResult==-1) ? 'Error Interno. Inténtelo de nuevo. Si el problema persiste, repórtelo a los administradores' :
  (submitResult==-2) ? 'Se encontró un record anterior en el mismo nivel, cuyo porcentaje no supera al enviado en este momento.' :
  'Error desconocido: Repórtelo a los administradores'

  return <div className="flex justify-center">
    <div className="flex flex-col justify-center">
      <div className="rounded flex flex-col p-4">
        <div className="flex justify-center">
          <img src={img} alt="Info Image" />
        </div>
        <p className=" text-md text-center text-wrap mt-4">{message}</p>
      </div>
    </div>
  </div>
}

export default SubmitResult