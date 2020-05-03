export interface MaybePathProps {
  path?: string
}

export interface RedirectProps extends MaybePathProps{
  from?: string
  to: string
  default?: boolean
}

export interface FormData {
  email: string
  password: string
}
