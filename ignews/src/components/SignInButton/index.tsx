import { FaGithub } from 'react-icons/fa'
import { FiX } from 'react-icons/fi'

import styles from './styles.module.scss'


export default function SignInButton() {

   const isSigned = false 

   return (
      <button
      className={styles.signInButtonStyle} 
      type='button'
      style={{ paddingRight: isSigned ? '1rem' : '2rem' }} 
      >

         <FaGithub color={isSigned ? '#a4d361' : '#eba417'} />

         {
            isSigned ? 'Matheus Martins' : 'SingIn in with github' 
         }

         {
            isSigned ? <FiX color='#737380' /> : null
         }
         
      </button>

   )
}