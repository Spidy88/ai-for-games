import { RouteComponentProps } from '@reach/router';

export interface LandingPageProps extends RouteComponentProps {}

export function LandingPage(props: LandingPageProps) {
    return (
        <h1>AI for Games</h1>
    );
}