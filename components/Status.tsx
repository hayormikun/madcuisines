type StatusProps = {
  status: string
}

export const Status = ({status}: StatusProps) => {
  if (status === 'active') {
    return (
      <div>Status</div>
    )
  }
  else{
    return (
      <div>Status</div>
    )
  } 
}
