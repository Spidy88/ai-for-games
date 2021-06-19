import bookCover from '../../assets/book-cover.jpg';
import { Playfield } from '../../components/playfield';
import spidyAvatar from '../../assets/spidy-avatar.png';
import villainAvatar from '../../assets/villain-avatar.png';

export interface LandingPageProps {}

export function LandingPage(props: LandingPageProps) {
    return (
        <>
        <section style={{ margin: '2rem 0', display: 'flex', gap: '1rem' }}>
            <div>
                <h1>AI for Games</h1>
                <p>To better understand the algorithms presented in this phenomenal book, I put together this interactive site of visuals that let you explore, compare, and evaluate each algorithm. Have fun!</p>
            </div>
            <img src={bookCover} alt="AI for Games book cover" style={{ maxHeight: '250px' }} />
        </section>

        <section style={{ margin: '2rem 0', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div style={{ outline: '1px solid var(--main-bg-color)', height: '300px' }}>
                <Playfield avatar={spidyAvatar} characters={[]} />
            </div>
            <div style={{ outline: '1px solid var(--main-bg-color)', height: '300px' }}>
                <Playfield avatar={villainAvatar} characters={[]} />
            </div>
        </section>
        </>
    );
}
