import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '../firebase';

import Header from './Header';
import { AuthButtons } from './AuthButtons';
import './Home.css'

function Home() {
    const [user] = useAuthState(auth)

    return (
        <>
        <section className="home">
            <div className="big-text">
                <h1>Your daily reminder</h1>
                <h1>to be mindful.</h1>
            </div>
            <ul>
                <li>Every day, we'll ask you a new question, like "What are you grateful for today?" or "What are your goals for today?"</li>
                <li>Post anonymously, and take a peek at what others posted too.</li>
                <li>You'll get a daily reminder in your inbox to take a second and think about a new question every day.</li>
            </ul>
        </section>

        <section className="login">
            <AuthButtons />
        </section>
        </>
    )
}

export default Home;