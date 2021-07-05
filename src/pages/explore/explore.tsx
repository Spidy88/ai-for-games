import React from 'react';
import { Grid, AlgorithmCard, CardLink } from './explore.css';
import Data from './explore.data';

export function ExplorePage() {
    return (
        <>
            <h1>Explore</h1>

            {Data.sections.map((section, i) => (
                <React.Fragment key={i}>
                    <h2>{section.title}</h2>
                    <Grid>
                        {section.articles.map((article, j) => (
                            <CardLink key={j} to={`explore/${article.url}`}>
                                <AlgorithmCard>
                                    <h3>{article.title}</h3>
                                    <p>{article.details}</p>
                                </AlgorithmCard>
                            </CardLink>
                        ))}
                    </Grid>
                </React.Fragment>
            ))}
        </>
    );
}
