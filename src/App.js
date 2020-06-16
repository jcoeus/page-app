import React from 'react';
import logo from './logo.svg';
import styles from './App.module.scss'
import classNames from 'classnames';
import { Grid, GridContainer, Cell } from 'react-foundation'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, faSwatchbook } from '@fortawesome/free-solid-svg-icons'
import { faTwitter, faGithub } from '@fortawesome/free-brands-svg-icons'
import MathJax from 'react-mathjax'

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

    const intro = {
        name: 'Intro',
        title: 'Hi',
        //subtitle: '[`xai-meh khan-poo s sah-luh s]',
        body: ['My name is Jaime (pronounced like xai-meh). I work with machines, and sometimes machines work with me too. If time and GPU permits, I occasionally work on NLP/U and Deep Learning research. Though not particularly good at it, I also enjoy writing and generative art.',
        'I graduated Columbia University where I studied CS and lots of math. During my time there, I helped build a bridge and a water well for an underserved community in Morocco. I also helped kickstart the Medical Informatics Society where I hosted machine learning lectures.',
        "If you'd like to collaborate on a project, please feel free to reach out. 😀",],
    };

    const proj = {
        name: 'Projects',
        title: 'Project',
        subtitle: 'sub',
        body: ["Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum consectetur iaculis dui. Interdum et malesuada fames ac ante ipsum primis in faucibus. Proin eget diam leo. In eu lorem scelerisque, egestas risus eget, pellentesque sapien. Fusce ac felis et ipsum gravida euismod nec eu magna. Nunc suscipit ex eu ex vehicula aliquam. Fusce eget faucibus nisl, nec laoreet ante. Cras volutpat est ut accumsan commodo. Aliquam facilisis vitae nisi sed sagittis. Donec hendrerit ac sem eu pharetra. Proin pulvinar eros at ante iaculis ultricies. Pellentesque cursus metus ligula, at mollis risus vehicula quis. In tempor ante et ex venenatis laoreet. Vivamus lacinia, dolor vitae congue consequat, ligula magna lobortis urna, feugiat pulvinar nisi lorem sed enim. Phasellus nec turpis tempor, luctus quam ut, lobortis ante. Phasellus lobortis molestie lectus, ac feugiat neque malesuada a. Morbi eget lacinia nunc. Donec suscipit, nibh tincidunt mollis bibendum, dui leo fermentum augue, convallis imperdiet felis libero nec justo. Etiam at velit at velit sollicitudin tincidunt. In eget elementum ex. Nam in erat eget erat suscipit venenatis ultrices et magna. Duis tempor, elit at lobortis sollicitudin, ipsum lacus lacinia tortor, a convallis mi lacus eu risus. Etiam suscipit diam eget sem ornare, a aliquet metus laoreet. Vivamus cursus et nibh non sagittis. Nam sodales sagittis pulvinar. Curabitur mattis ultrices lectus sed laoreet. Integer lobortis arcu tincidunt ex lacinia tempus. Proin maximus erat ac felis interdum, a feugiat lectus convallis. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec gravida orci eget dolor faucibus, at placerat ipsum fermentum. Sed facilisis, quam ac pellentesque tincidunt, lectus dui dapibus felis, nec pellentesque odio erat sit amet nisl. Pellentesque ante lacus, viverra vel purus eget, semper placerat magna. Curabitur sollicitudin dolor orci, vel tempus enim luctus in. Aenean vitae diam a erat molestie tincidunt. Pellentesque congue ornare dignissim. Integer elementum consectetur massa, faucibus sodales leo ultrices sed. Nullam orci neque, ullamcorper a arcu non, egestas cursus tellus. Nulla fringilla, mauris sit amet accumsan consectetur, ex tellus venenatis ligula, vel venenatis diam nibh ut mauris. Sed quis nunc nec justo blandit eleifend vitae quis dui. Sed congue cursus finibus. Vivamus sed purus dui. Curabitur eget diam maximus, feugiat velit in, semper ex. Fusce metus nulla, pharetra in lorem congue, blandit accumsan tellus. Mauris aliquam tincidunt purus ut varius. Nam rutrum mi sed lacus aliquam, vitae consequat justo auctor. Sed nec felis eu massa malesuada condimentum vel eget massa. Donec id mi in mauris lobortis tempor at a orci. Maecenas at aliquam ante. Sed at turpis eu leo posuere hendrerit vel eget odio. Praesent in congue sapien, non volutpat eros. Aenean aliquet facilisis erat sed dignissim. Nulla mollis vulputate tortor, ultrices imperdiet libero ornare ut. Ut at nisl lectus. Duis facilisis diam est, sed hendrerit leo dapibus molestie. Sed a lacus at enim congue blandit. Duis id fermentum purus. Vestibulum malesuada ultricies tellus at dapibus. Maecenas non nunc in neque efficitur pharetra. In at vehicula nunc. Proin sollicitudin, metus non maximus lobortis, nunc justo tempor eros, in venenatis nisi velit a nulla. Nam quis orci in sapien molestie vehicula. Fusce sollicitudin lectus nibh, non finibus dolor consectetur quis"
    ],};

    const research = {
        name: 'Research',
        title: 'Research',
        subtitle: '',
        body: ['these are what'],
    };

    const [curInfo, setCurrentInfo] = React.useState(intro);
    const [animate, setAnimate] = React.useState(false);
    const [colorN, setColorN] = React.useState(0);

    const handleInfoSwitch = (cur, name) => {
        if (cur == name) {
            console.log(cur);
            console.log(name);
        }
        else if (name === 'Intro') {
            setAnimate(!animate);
            setTimeout(() => {
                setCurrentInfo(intro);
                setAnimate(animate);
            }, 350);
        }
        else if (name === 'Projects') { 
            setAnimate(!animate);
            setTimeout(() => {
                setCurrentInfo(proj);
                setAnimate(animate);
            }, 350);
        }
        else if (name === 'Research') {
            setAnimate(!animate);
            setTimeout(() => {
                setCurrentInfo(research);
                setAnimate(animate);
            }, 350);
        }
    }

    const handleColorSwitch = () => {
        console.log('color switch was clicked');
        setColorN((colorN + 1)%4);
        console.log(colorN)
    }

    return (
        <div className={classNames(styles.container)}>
            <div className={styles.row}>
            <nav className={classNames(styles.side, 
                                       colorN === 0 && styles.sideColor, 
                                       colorN === 1 && styles.sideColorOne,  
                                       colorN === 2 && styles.sideColorTwo,
                                       colorN === 3 && styles.sideColorThree)}>
                <div>
                <ul>
                    <li onClick={handleColorSwitch}>
                        <a>
                            <span style={{paddingLeft: "32px"}}>
                                <FontAwesomeIcon icon={faSwatchbook}/>
                                
                            </span>
                        </a>
                    </li>
                {menu.map(item => (
                    <li key={item.name} onClick={() => handleInfoSwitch(curInfo.name, item.name)}>
                        <a >
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
            <div className={classNames(styles.content,         
                                       colorN === 0 && styles.contentColor,
                                       colorN === 1 && styles.contentColorOne,
                                       colorN === 2 && styles.contentColorTwo,
                                       colorN === 3 && styles.contentColorThree)}>
                <div className={classNames(colorN === 0 && styles.cardColor, 
                                           colorN === 1 && styles.cardColorOne,  
                                           colorN === 2 && styles.cardColorTwo,
                                           colorN === 3 && styles.cardColorThree,
                                           styles.card, animate && styles.up)}>
                    <h2>{curInfo.title} </h2>
                    <h5>{curInfo.subtitle}</h5>
                    <hr />
                        <Grid >
                        <Cell small={12} medium={3} large={3} xlarge={3}>
                            <div className={styles.cardImage}>
                                <img src="https://i.gifer.com/NYRT.gif" alt="intro" ></img>
                            </div>
                            </Cell>
                            <Cell small={12} medium={9} large={9} xlarge={9}>
                            <div className={styles.cardText}>

                                <span>
                                    {curInfo.body.map(item => ( 
                                        <p key={item}>{item}</p>
                                    ))}
                                </span>
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
                            </div>
                            </Cell>
                            

                        </Grid>
                </div>
                
            </div>
            </div>
        </div>
    );
};


export default App;
