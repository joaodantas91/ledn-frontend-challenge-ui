import { ReactNode } from 'react'
import './styles.css'
import Header from './Header'

export default function Screen({children}: {children: ReactNode}) {
    return (
        <div className='screen'>
            <Header />
            {children}
        </div>
    )
}