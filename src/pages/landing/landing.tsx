import bookCover from '../../assets/images/book-cover.jpg';
import { Playfield } from '../../components/playfield';
import { Controls } from '../../components/controls';
import {
    HeaderSection,
    BookCoverImg,
    DemoSection,
    PlaygroundContainer,
    ControlsContainer
} from './landing.css';
import { useState } from 'react';
import { WanderApp } from '../../apps/wander-app';

export interface LandingPageProps {}

export function LandingPage(props: LandingPageProps) {
    const [wanderApp] = useState(() => new WanderApp());

    return (
        <main>
            <HeaderSection>
                <header>
                    <h1>AI for Games</h1>
                    <p>
                        To better understand the algorithms presented in this phenomenal book, 
                        I put together this interactive site of visuals that let you explore, 
                        compare, and evaluate each algorithm. Have fun!
                    </p>
                </header>
                <BookCoverImg src={bookCover} alt="AI for Games book cover" />
            </HeaderSection>

            <DemoSection>
                <PlaygroundContainer>
                    <Playfield app={wanderApp} />
                </PlaygroundContainer>

                <ControlsContainer>
                    <Controls app={wanderApp} />
                </ControlsContainer>
            </DemoSection>
        </main>
    );
}
