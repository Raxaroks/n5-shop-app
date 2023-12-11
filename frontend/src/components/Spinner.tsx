import { dotSpinner } from 'ldrs'


dotSpinner.register();

export interface SpinnerProps {
  size?: number;
}

export const Spinner = ({ size = 80 }: SpinnerProps) => {
  return (
    <div className='m-auto'>
      <l-dot-spinner
        size={ size }
        speed="0.9"
        color="#52525b"></l-dot-spinner>
    </div>
  )
}
