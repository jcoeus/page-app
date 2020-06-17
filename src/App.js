import React from 'react';
import logo from './logo.svg';
import styles from './App.module.scss'
import classNames from 'classnames';
import { Grid, GridContainer, Cell, Stack } from 'react-foundation'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, faSwatchbook } from '@fortawesome/free-solid-svg-icons'
import { faTwitter, faGithub } from '@fortawesome/free-brands-svg-icons'
import { MathJax } from 'react-mathjax'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism'

const App = () => {
    const menu = [
        {
            name: 'Intro',
            href: '',
        },  
        {
            name: 'Projects',
            href: '',
        },
        {
            name: 'Research',
            href: '',
        },
    ];
    const contact = [
        {
            type: 'email',
            value: 'jaime.campos.salas[at]gmail.com',
        },
        {
            type: 'twitter',
            value: '@xaimehcs',
        },
        {
            type: 'github',
            value: '@jcoeus',
        }
    ];

    const [curCard, setCurCard] = React.useState('Intro');
    const [animate, setAnimate] = React.useState(false);
    const [colorN, setColorN] = React.useState(0);

    const handleColorSwitch = () => {
        console.log('color switch was clicked');
        setColorN((colorN + 1)%4);
        console.log(colorN)
    };

    const handleCardSwitch = (fromCard, toCard) => {
        console.log(fromCard === toCard);
        if (fromCard !== toCard) {
            setAnimate(!animate);
            setTimeout(() => {
                setCurCard(toCard);
                setAnimate(animate);
            }, 350);
        }
    };

    return (
        <div className={classNames(styles.container)}>
            <div>
                <Side info={menu} colorN={colorN} curCard={curCard} onColorChange={handleColorSwitch} onCardChange={handleCardSwitch}/>
                <div className={classNames(styles.content,         
                                        colorN === 0 && styles.contentColor,
                                        colorN === 1 && styles.contentColorOne,
                                        colorN === 2 && styles.contentColorTwo,
                                        colorN === 3 && styles.contentColorThree)}>
                    <Card curCard={curCard} colorN={colorN} animate={animate}/>
                </div>
            </div>
        </div>
    );
};

const Side = props => {

    const handleCardSwitch = (cur) => {
        console.log("handleCardSwitch");
    };

    return (
        <nav className={classNames(styles.side, 
                                    props.colorN === 0 && styles.sideColor, 
                                    props.colorN === 1 && styles.sideColorOne,  
                                    props.colorN === 2 && styles.sideColorTwo,
                                    props.colorN === 3 && styles.sideColorThree)}>
            <div>
                <ul>
                    <li onClick={props.onColorChange}>
                        <a>
                            <span style={{paddingLeft: "32px"}}>
                                <FontAwesomeIcon icon={faSwatchbook}/>
            
                            </span>
                        </a>
                    </li>
                    {props.info.map(item => (
                    <li key={item.name} onClick={() => props.onCardChange(props.curCard, item.name)}>
                        <a>
                            <span>
                                {item.name}
                            </span>
                        </a>
                    </li>
                    ))}
                </ul>
            </div>
            <div style={{display: "flex", fontSize: "1.3em",flexDirection: "column", height: "auto", paddingTop: "calc(100vh - 390px)"}}>
                <ul >
                    <li>
                        <a href="mailto:jaime.campos.salas@gmail.com">
                            <span style={{paddingLeft: "33px"}}>
                                <FontAwesomeIcon icon={faEnvelope} />
                            </span>
                        </a>
                    </li>
                    <li>
                        <a href="https://twitter.com/xaimehcs">
                            <span style={{paddingLeft: "33px"}}>
                                <FontAwesomeIcon icon={faTwitter} />
                            </span>
                        </a>
                    </li>
                    <li>
                        <a href="https://github.com/jcoeus">
                            <span style={{paddingLeft: "33px"}}>
                                <FontAwesomeIcon icon={faGithub} />
                            </span>
                        </a>
                    </li>
                </ul>
            </div>
        </nav>

    )
};

const Card = props => {
    
    if (props.curCard === 'Intro') {
        return (
            <IntroCard colorN={props.colorN} animate={props.animate}/>
        )
    }
    else if (props.curCard  === 'Projects') {
        return (
            <ProjectCard colorN={props.colorN} animate={props.animate}/>
        )
    }
    else if (props.curCard === 'Research') {
        return (
            <ResearchCard colorN={props.colorN} animate={props.animate}/>
        )
    }
};

const IntroCard = props => (
    <div className={classNames(styles.content,         
                                props.colorN === 0 && styles.contentColor,
                                props.colorN === 1 && styles.contentColorOne,
                                props.colorN === 2 && styles.contentColorTwo,
                                props.colorN === 3 && styles.contentColorThree)}>
        <div className={classNames(props.colorN === 0 && styles.cardColor, 
                                    props.colorN === 1 && styles.cardColorOne,  
                                    props.colorN === 2 && styles.cardColorTwo,
                                    props.colorN === 3 && styles.cardColorThree,
                                    styles.card, props.animate && styles.up)}>
            <h2>Hi</h2>
            <hr />
            <Grid>
                <Cell small={12} medium={3} large={3} xlarge={3}>
                    <div className={styles.cardImage}>
                        <img src="https://i.gifer.com/NYRT.gif" alt="intro" ></img>
                    </div>
                </Cell>
                <Cell small={12} medium={9} large={9} xlarge={9}>
                    <div className={styles.cardText}>
                        <span>
                            <p>
                                My name is Jaime (pronounced like xai-meh). I work with machines, and sometimes machines work with me too. 
                                If time and GPU permits, I occasionally work on NLP/U and Deep Learning research. Though not particularly 
                                good at it, I also enjoy writing and generative art.
                            </p>
                            <p>
                                I graduated Columbia University where I studied CS and lots of math. During my time there, I helped build a 
                                bridge and a water well for an underserved community in Morocco. I also helped kickstart the Medical Informatics 
                                Society where I hosted machine learning lectures.
                            </p>
                            <p>
                                If you'd like to collaborate on a project, please feel free to reach out. 😀
                            </p>
        
                        </span>
                    </div>
                </Cell>
            </Grid>
        </div>
    </div>
);

const ProjectCard = props => {

    const codeBlock = 'import React from "react";';

    return (
        <div className={classNames(styles.content,         
                                    props.colorN === 0 && styles.contentColor,
                                    props.colorN === 1 && styles.contentColorOne,
                                    props.colorN === 2 && styles.contentColorTwo,
                                    props.colorN === 3 && styles.contentColorThree)}>
            <div className={classNames(props.colorN === 0 && styles.cardColor, 
                                        props.colorN === 1 && styles.cardColorOne,  
                                        props.colorN === 2 && styles.cardColorTwo,
                                        props.colorN === 3 && styles.cardColorThree,
                                        styles.card, props.animate && styles.up)}>
                <h2>Projects</h2>
                <hr />
                <Grid>
                    <Cell small={12} medium={12} large={12} xlarge={12}>
                        <div className={styles.cardText}>
                            <span>
                                <h5>
                                    Columbia Engineering Outreach Program Database
                                </h5>
                            </span>
                        </div>
                    </Cell>
                    <Cell small={12} medium={12} large={12} xlarge={12}>
                        <div className={styles.cardText}>
                            <span>
                                <h5>
                                    Compiler Module for Dead Code Elimination
                                    
                                </h5>
                            </span>
                            <p>
                            <SyntaxHighlighter language="python" style={atomDark}>
                                    {codeBlock}
                                </SyntaxHighlighter>
                            </p>
                        </div>
                    </Cell>
                </Grid>
            </div>
        </div>
    );
};

const ResearchCard = props => (
    <div className={classNames(styles.content,         
                                props.colorN === 0 && styles.contentColor,
                                props.colorN === 1 && styles.contentColorOne,
                                props.colorN === 2 && styles.contentColorTwo,
                                props.colorN === 3 && styles.contentColorThree)}>
        <div className={classNames(props.colorN === 0 && styles.cardColor, 
                                    props.colorN === 1 && styles.cardColorOne,  
                                    props.colorN === 2 && styles.cardColorTwo,
                                    props.colorN === 3 && styles.cardColorThree,
                                    styles.card, props.animate && styles.up)}>
            <h2>Research</h2>
            <hr />
            <Grid>
                <Cell small={12} medium={12} large={12} xlarge={12}>
                    <div className={styles.cardText}>
                        <span>
                            <h5>
                                Text Summarization with Modern Word Embeddings and Pointer-Generator Networks
                            </h5>
                            <p>
                            </p>
                            <table className={classNames(Stack, styles.resultTable)}>
                                <thead>
                                    <tr>
                                        <th>Article</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>Some Text</td>
                                    </tr>
                                </tbody>

                            </table>
   
                        </span>
                        <span>
                            <h5>
                                Deep Learning Resource Analysis Using Memory-Efficient Adaptive Optimization
                            </h5>
                            <p>
                                
                            </p>
                            <p>
                                
                            </p>
                            <MathJax.Provider input="tex">
                                <div>
                                    <b><u>SM3-II Algorithm</u></b>
                                    <br/>
                                    1: <b>parameters:</b> learning rate <MathJax.Node inline formula={'\\eta'}/>
                                    <br/>
                                    2: initialize <MathJax.Node inline formula={'w_1 = 0 ; \\forall r \\in [k] : \\mu\'_0(r) = 0'}/>
                                    <br/>
                                    3: <b>for</b> <MathJax.Node inline formula={'t = 1, \\cdots, T'}/> <b>do</b>
                                    <br/>
                                    4: &nbsp;&nbsp;&nbsp;&nbsp;receive gradient <MathJax.Node inline formula={'g_t = \\nabla \\ell_t(w_t)'}/>
                                    <br/>
                                    5: &nbsp;&nbsp;&nbsp;&nbsp;initialize <MathJax.Node inline formula={'\\forall r \\in [k] : \\mu\'_t(r) = 0'}/>
                                    <br/>
                                    6: &nbsp;&nbsp;&nbsp;&nbsp;<b>for</b> <MathJax.Node inline formula={'i=1,\\cdots,d'}/> <b>do</b>
                                    <br/>
                                    7: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<MathJax.Node inline formula={'\\nu\'_t(i) \\leftarrow \\min_{r:S_r\\ni i}\\mu\'_{t-1}(r) + g_t^2(i)'}/>
                                    <br/>
                                    8: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<MathJax.Node inline formula={'w\'_{t+1}(i) \\leftarrow w_t(i) - \\eta g_t(i) / \\sqrt{\\nu\'_t(i)}'}/>
                                    <br/>
                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<MathJax.Node inline formula={'\\triangleright'}/> with the convention that <MathJax.Node inline formula={'0/0 = 0'}/>
                                    <br />
                                    9: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<b>for</b> all <MathJax.Node inline formula={'r: S_r \\ni i'}/> <b>do</b>
                                    <br/>
                                    10: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<MathJax.Node inline formula={'\\mu\'_t(r) \\leftarrow \\max\\{\\mu\'_t(r),\\nu\'_t(i)\\}'}/>
                                </div>
                            </MathJax.Provider>

                        </span>
                    </div>
                </Cell>
            </Grid>
        </div>
    </div>
);

const TextSummaryTable = props => {

}

export default App;
