import { ReactNode } from "react";
import './styles.css'

export default function Main({children, className}: {children: ReactNode, className: string}) {
    return (
        <main className={"main " + className}>
            <video autoPlay muted loop id="myVideo">
                <source src="http://localhost:3000/stars.mp4" type="video/mp4" />
            </video>
            {children}
        </main>
        
    )
}