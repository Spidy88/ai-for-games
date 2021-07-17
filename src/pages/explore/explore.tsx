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
                    {section.articles.map((article, j) => (
                        <CardLink key={j} to={`explore/${article.url}`}>
                            <AlgorithmCard>
                                <Grid>
                                    <div>
                                        <h3>{article.title}</h3>
                                        <p>{article.details}</p>
                                    </div>
                                    <div>
                                        <div style={{ height: '350px' }}>
                                            
                                        </div>
                                    </div>
                                </Grid>
                            </AlgorithmCard>
                        </CardLink>
                    ))}
                </React.Fragment>
            ))}
        </>
    );
}
