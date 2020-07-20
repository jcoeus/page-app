import React, { useEffect } from 'react';
import styles from './App.module.scss'
import classNames from 'classnames';
import { Grid, Cell } from 'react-foundation'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, faSwatchbook, faCode, faScroll, faArrowRight } from '@fortawesome/free-solid-svg-icons'
import { faTwitter, faGithub } from '@fortawesome/free-brands-svg-icons'
import MathJax from 'react-mathjax'
import { PrismAsyncLight as SyntaxHighlighter } from 'react-syntax-highlighter'
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
                setCurCard("Blank");
                setCurCard(toCard);
                setAnimate(animate);
            }, 100);
        }
    };

    return (
        <div className={classNames(styles.container)}>
            <div>
                <Top info={menu} colorN={colorN} curCard={curCard} onColorChange={handleColorSwitch} onCardChange={handleCardSwitch}/>
                <Side info={menu} colorN={colorN} curCard={curCard} onColorChange={handleColorSwitch} onCardChange={handleCardSwitch}/>
                <div className={classNames(styles.content,         
                                        colorN === 0 && styles.contentColor,
                                        colorN === 1 && styles.contentColorOne,
                                        colorN === 2 && styles.contentColorTwo,
                                        colorN === 3 && styles.contentColorThree)}>
                    <Card curCard={curCard} colorN={colorN} animate={animate} onCardChange={handleCardSwitch}/>
                </div>
            </div>
        </div>
    );
};

const Top = props => {
    return (
        <nav className={classNames(styles.top, 
            props.colorN === 0 && styles.sideColor, 
            props.colorN === 1 && styles.sideColorOne,  
            props.colorN === 2 && styles.sideColorTwo,
            props.colorN === 3 && styles.sideColorThree)}>
<div>
<ul>
<li onClick={props.onColorChange}>
<a>
    <span style={{paddingLeft: "17px"}}>
        <FontAwesomeIcon icon={faSwatchbook}/>
    </span>
</a>
</li>
{props.info.map(item => (
<li key={item.name} onClick={() => props.onCardChange("", item.name)}>
<a>
    <span>
        {item.name}
    </span>
</a>
</li>
))}
</ul>
</div>
</nav>
    );

};

const Side = props => {

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
                    <li key={item.name} onClick={() => props.onCardChange("", item.name)}>
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

const Path = props => {

    const size = GetWinSize();
    var maxlen = 0.21 * (size.width) - 120;
    var curPath = [...props.path];
    
    return (
        <div className={styles.path}>
            <span>
            <h6>
                    <a>jcs &nbsp; /</a>{props.path.map(item => (
                        
                        <a onClick={() => props.switch(item)}> 
                            {item.length > maxlen ? item.substring(0,maxlen) + "..." : item} &nbsp; /
                        </a>
                        
                    ))}
                </h6>
            </span>
        </div>

    )
}

const Card = props => {

    switch (props.curCard) {
        case 'Intro':
            return (
                <IntroCard colorN={props.colorN} animate={props.animate} switch={props.onCardChange}/>
            )
        case 'Projects':
            return (
                <ProjectCard colorN={props.colorN} animate={props.animate} switch={props.onCardChange}/>
            )
        case 'Research':
            return (
                <ResearchCard colorN={props.colorN} animate={props.animate} switch={props.onCardChange}/>
            )
        case 'Blank':
            return (
                <div></div>
            )
    }
    
};

const CardBody = props => {
    const livenessFormula = `
    \\textrm{IN}_n = \\textrm{USE}_n \\cup (\\textrm{OUT}_n - \\textrm{DEF}_n)\\\\
    \\textrm{OUT}_n = \\bigcup_{s \\in {SUCCESSORS}_n} \\textrm{IN}_S
    `;

    const liveSetsStructCode = `
    struct liveSets {
        vector<std::string> in;
        vector<std::string> out;	
        vector<std::string> use;
        vector<std::string> def;
    };
    `;

    const vsUnionCode = `
    vector<std::string> vsUnion(vector<std::string> vectorOne, 
                                vector<std::string> vectorTwo) {	
        vector<std::string> vectorUni(vectorOne.size() + vectorTwo.size());
        auto it = set_union(vectorOne.begin(), vectorOne.end(), 
                            vectorTwo.begin(), vectorTwo.end(), 
                            vectorUni.begin()); 
        vectorUni.resize(it - vectorUni.begin());
        return vectorUni;
    }
    `;

    const vsSubstCode = `
    vector<std::string> vsSubst(vector<std::string> vectorOne, 
                                vector<std::string> vectorTwo) {
    	vector<std::string> vectorSub(vectorOne.size() + vectorTwo.size());
        auto it = set_difference(vectorOne.begin(), vectorOne.end(), 
                                 vectorTwo.begin(), vectorTwo.end(), 
                                 vectorSub.begin());
        vectorSub.resize(it - vectorSub.begin());
	    return vectorSub;
    }
    `;

    const getSetsCode = `
    struct liveSets getSets(BasicBlock &prevBB, BasicBlock &curBB, 
                            bool entry, vector<BasicBlock *> list) {
        BasicBlock *PNbb;
        PHINode *PN;
        Value *PNv;
        int count;
	    vector<std::string> USEvar, DEFvar, INvar, OUTvar, t;
	    struct liveSets sets;
	
        for (auto &ins : curBB) {
            if (isa<PHINode>(&ins)) {
                PN = dyn_cast<PHINode>(&ins);
                count = PN->getNumIncomingValues();
                
                for (int i = 0; i < count; i++) {
                    PNbb = PN->getIncomingBlock(i);
                    PNv = PN->getIncomingValue(i);
                    if (&prevBB == PNbb) {
                        t = {variable_to_string(PNv)};
                        USEvar = vsUnion(USEvar, t);
                    }	
                }
                
                Value *Pd = cast<Value> (&ins);
                t = {variable_to_string(Pd)};
                DEFvar = vsUnion(DEFvar, t);		
        
                continue;
            }

            for (Use &U : ins.operands()) {
                Value *val = U.get();
                
                if (isa<BasicBlock>(val))
                    continue;

                else if (isa<Instruction>(val) || isa<Argument>(val)) {
                    vector<std::string> t = {variable_to_string(val)};
                    USEvar = vsUnion(USEvar, t);
                }
            }

            Value *p = cast<Value> (&ins);
            if (!isa<BranchInst>(ins) && !isa<ReturnInst>(ins)) {
                vector<std::string> t = {variable_to_string(p)};
                DEFvar = vsUnion(DEFvar, t);
            }
            USEvar = vsSubstst(USEvar, DEFvar);
        }
            succ_iterator SI = succ_begin(&curBB), E = succ_end(&curBB);

        if (SI == E) { 
            if (!USEvar.empty()) {
                INvar = USEvar;
            }
        }
        else {
            BasicBlock *S = *SI;
            struct liveSets S_sets;
            vector<std::string> Sin;
            if ((&prevBB != &curBB || entry) && !bb_inlist(list, S)) {
                vector<BasicBlock *> copy = list;
                copy.push_back(S);
                S_sets = getSets(curBB, *S, 0, copy);
                Sin = S_sets.in;
            }

            OUTvar = vsUnion(OUTvar, Sin);	

            BasicBlock *NS;
            struct liveSets NS_sets;
            vector<std::string> NSin;
            ++SI;

            while (SI != E) {	
                NS = *SI;

                if ((&prevBB != &curBB || entry) && !bb_inlist(list, NS)) {
                    vector<BasicBlock *> copy = list;
                    copy.push_back(NS);
                    NS_sets = get_sets(curBB, *NS, 0, copy);
                    NSin = NS_sets.in;
                }

                OUTvar = vsUnion(OUTvar, NSin);
                ++SI;
            } 
            INvar = vsUnion(USEvar, vsSubstst(OUTvar, DEFvar));
        }
        sets = {INvar, OUTvar, USEvar, DEFvar};

        return sets;
        }
    `;

    const textSummaryContentOne = [
        {
            key: 'Article',
            val: '"this is the moment an unlucky man was gored between the legs by a rampaging bull after being knocked to the ground during a bullrunning celebration in spain . the unnamed man was sprinting ahead of the animal , trying to make it to the safety behind a set of iron bars when the angry animal sent him sprawling to the floor . and despite his desperate efforts to climb back up , the bull appeared to hit him right in the bottom with one of its horns as he tried to scramble away . scroll down for video . this unlucky man was gored during a bullrunning event in teulada , a small coastal town on spain ’s costa blanca , after falling over in front of the beast . the man , who has not been identified , was seen running away from the angry animal before it caught him with one horn , sending him sprawling to the floor . pictures show him crawling desperately towards the safety of the bull bars , but he was unable to make it before the horn hit him square between the legs . the unfortunate incident happened on the street in teulada , a small coastal town on spain ’s costa blanca , during the annual fiesta . the celebrations begin on april 8 and last until april 19 , and include floatillas and parades celebrating the town ’s patron saint , sant vicent ferrer . as part of the fiesta , large , aggressive bulls are let loose to run around the streets , with local and visitors invited to run alongside them . the challenge is to tease the animals before escaping behind one of the wooden pallets or iron bull bars to safety . witnesses said the man was seen limping towards medical crews after the attack , but was unsupported and appeared not to have been seriously hurt . the bullrunning takes place during the town ’s annual fiesta , which includes float parades in honour of sant vicent ferrer , the village ’s patron saint . websites advertising the bull running recommend leaving the sport to the experienced locals , noting that the animals are faster than people think , and that it is mostly foreigners that get injured . while it is not known where this man came from , he was seen limping away to be tended by medical crews after the attack . he was not though to have been seriously injured "',
        },
        {
            key: 'Human',
            val: '"man was fleeing bull during fiesta celebrations in teulada , eastern spain . was knocked to the ground before crawling towards safety of bull bars . however he could n’t make it before horn caught him between the legs . seen limping towards medics , but was not thought to be seriously hurt ."',
        }, 
        {
            key: 'PointerGenerator + Coverage (baseline)',
            val: '"the unnamed man was gored between the legs by a rampaging bull . the man was gored during a bullrunning event in teulada , a small coastal town on spain ’s costa blanca . the celebrations begin on april 8 and last until april 19 ."',
        },
        {
            key: 'Glove + PointerGenerator + Coverage',
            val: '"man was gored between the legs by a rampaging bull . the bull appeared to hit him right in the bottom with one of its horns as he tried to scramble away . despite his desperate efforts to climb back up , trying to make it to the safety behind a set of iron bars ."',
        },
        {
            key: 'SkipGram + PointerGenerator + Coverage',
            val: '"unlucky man was gored during a bullrunning event in teulada , a small coastal town on spain ’s patron saint , sant vicent ferrer . witnesses said the man was seen limping towards medical crews after the town ’s patron saint . websites advertising the bull running recommend leaving the sport to run around the streets ."',
        },
        {
            key: 'ELMo + PointerGenerator + Coverage',
            val: '"unlucky man was gored between the legs by a rampaging bull after being knocked to the ground during a bullrunning celebration in spain . the man was gored during a bullrunning event in teulada , a small coastal town on spain ’s costa blanca ."',
        }
    ];

    const textSummaryContentTwo = [
        {
            key: 'Article',
            val: '"jamie carragher believes chelsea captain john terry is the best defender to have ever graced the premier league . terry , 34 , has enjoyed another impressive season at stamford bridge and was the star performer as he led jose mourinho ’s side to a 0-0 draw against arsenal on sunday . the draw at the emirates means chelsea now need just six points from five games to claim their first premier league title since 2010 . john terry celebrates after the premier league match between arsenal and chelsea at the emirates stadium . jamie carragher believes the chelsea captain is the best defender to have played in the premier league . carragher insists terry deserves much of the credit , saying on sky sports : ‘ there ’s no doubt that , just behind -lrb- eden -rrb- hazard in this chelsea team , terry has been the most influential . ‘ we ’ve seen -lrb- cesc -rrb- fabregas , -lrb- nemanja -rrb- matic and diego costa feature in the early part of the season , but if you look at terry ’s display -lrb- against arsenal -rrb- he was outstanding . ‘ we talk about chelsea being a defensive team , but sometimes you ’ve got to say they defend brilliantly , and terry is the best . carragher -lrb- left -rrb- claimed terry has been almost as influential as chelsea ’s star man eden hazard . ‘ there have been a lot of great centre-backs in premier league history , but i think he has been the best that we ’ve seen . ’ blues boss mourinho was also quick to praise his captain after sunday ’s draw and even claimed it was terry ’s best performance in a chelsea shirt . mourinho said : ’ i told john terry in the dressing room that he made fantastic performances with me in six years but for me this was the best i have seen from him . ‘ it was the best jt has ever played . his defensive performance was absolutely amazing . ’ terry looks to get the better of arsenal striker olivier giroud during the 0-0 draw in north london . blues boss jose mourinho hailed terry ’s performance against arsenal as the‘ best ’ he has seen"',
        },
        {
            key: 'Human',
            val: '"john terry helps chelsea earn 0-0 premier league draw against arsenal . chelsea captain has been in brilliant form for jose mourinho this season . jamie carragher believes terry is the premier league best centre back . mourinho : that was terry best performance for chelsea . if there was a pfa defender of the year category , terry would clean up !"',
        }, 
        {
            key: 'PointerGenerator + Coverage (baseline)',
            val: '"chelsea captain john terry is the best defender to have ever graced the premier league . the draw at the emirates means chelsea now need just six points from five games to claim their first premier league title since 2010"',     
        },
        {
            key: 'Glove + PointerGenerator + Coverage',
            val: '"jamie carragher believes chelsea captain john terry is the best defender . terry , 34 , has enjoyed another impressive season at stamford bridge . draw at the emirates means chelsea now need just six points from five games to claim their first premier league title since 2010 . blues boss jose mourinho hailed terry ’s performance against arsenal as ‘ best ’ he has seen ."',
        },
        {
            key: 'SkipGram + PointerGenerator + Coverage',
            val: '"john terry celebrates after the premier league match between arsenal and chelsea at the emirates stadium . the draw at the emirates means chelsea now need just six points from five games to claim their first premier league title since 2010 ."',
        },
        {
            key: 'ELMo + PointerGenerator + Coverage',
            val: '"jamie carragher believes chelsea captain john terry is the best defender to have ever graced the premier league . the draw at the emirates means chelsea now need just six points from five games to claim their first premier league title . the chelsea captain is the best defender to have played in the premier league ."',
        }
    ];

    if (props.content === "Compiler Module for Dead Code Elimination") {
        
        return (
            <div className={styles.cardText}>
                <div nameClass={styles.codeHigh}>
                    <MathJax.Provider  input="tex">
                        <MathJax.Node formula={livenessFormula}/>
                    </MathJax.Provider>
                    <SyntaxHighlighter language="cpp" style={atomDark}>
                        {liveSetsStructCode}
                    </SyntaxHighlighter>
                    <SyntaxHighlighter language="cpp" style={atomDark}>
                        {vsUnionCode}
                    </SyntaxHighlighter>
                    <SyntaxHighlighter language="cpp" style={atomDark}>
                        {vsSubstCode}
                    </SyntaxHighlighter>
                    <SyntaxHighlighter language="cpp" style={atomDark}>
                        {getSetsCode}
                    </SyntaxHighlighter>
                </div>
                <br/>
                <br/>
                <hr/>
                <hr/>
            </div>
        )
    }
    else if (props.content === "Text Summarization with Modern Word Embeddings and Pointer-Generator Networks") {
        return (
            <div >
                <span>
                    with Andres Talero and Abdullah Siddique
                    <hr/>
                    <h6>
                        Abstract
                    </h6>
                    <p>
                        We conduct a performance overview of novel word embedding developments over the past two decades. We apply transfer learning to a text summarization neural network by administering different word embedding types to the network, which uses a combination of extractive and abstractive methods. We describe the differences in training and implementation for different word embedding types and produce a quantitative and qualitative analysis that compares the results produced by each one.
                    </p>
                    <hr/>
                    <h6>
                        Results
                    </h6>
                    <p>
                        Sample Summaries
                    </p>
                    
                    <TextSummary content={textSummaryContentOne}/>
                    <TextSummary content={textSummaryContentTwo}/>   
                    <hr/>
                </span>
                <br/>
                <br/>
                <hr/>
                <hr/>
            </div>
        )
    }

    else if (props.content === "Deep Learning Resource Analysis Using Memory-Efficient Adaptive Optimization") {
        return (
            <div>
                <span>                         
                 with Rahul Das and Zhixiang Hu
                <hr/>
                <h6>
                    Abstract
                </h6>
                <p>
                The use of adaptive gradient-based optimizers is widespread in machine learning, the most popular of which are Adam, Adagrad, and Adafactor. These optimizers utilize cumulative second-order statistics to tune the learning rate of each parameter during the optimization process, presenting numerous advantages, most importantly, constraining the time and space requirements of the methods to be linear in the number of parameters.
However, the existing optimizers still present significant memory overhead when training models with billions of parameters. This places a limitation on the size of the model and on the batch size during training, which can severely effect the accuracy of the model. By improving on the memory overhead of existing optimizers, we can train ever more complex and accurate models, which is especially pertinent to the field of natural language processing. Anil et al. [2] present a novel adaptive optimization method which retains the benefits of conventional per-parameter adaptivity while significantly reducing memory requirements.
                </p>
                <hr/>
                <h6>
                    Background
                </h6>
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
                <hr/>
                <h6>
                    Results
                </h6>
                </span>
            </div>
        )
    }
    else if (props.content === "Projects") {

        const projects = [
            {
                title: "Columbia Engineering Outreach Program Database",
                summary: "Some description",
            },
            {
                title: "Compiler Module for Dead Code Elimination",
                summary: "Some other description",
            }
        ]
        return (
            <Cell small={12} medium={6} large={6} xlarge={6} >
                {projects.map(item => (
                    <SubCard type={"P"} icon={faCode} summary={item.summary}
                        title={item.title} action={() => props.switch(item.title)}/>
                ))}
            </Cell>
          
        )

    }
    else if (props.content === "Research") {

        return (
            <div>
                <Cell small={12} medium={6} large={6} xlarge={6}>
                    <SubCard type={"R"} icon={faScroll} title={"Text Summarization with Modern Word Embeddings and Pointer-Generator Networks"} action={() => props.switch("Text Summarization with Modern Word Embeddings and Pointer-Generator Networks")}/>
                </Cell>
                <Cell small={12} medium={6} large={6} xlarge={6}>
                    <SubCard type={"R"} icon={faScroll} title={"Deep Learning Resource Analysis Using Memory-Efficient Adaptive Optimization"} action={() => props.switch("Deep Learning Resource Analysis Using Memory-Efficient Adaptive Optimization")}/>
                </Cell>
            </div>
        )
    }
    else {
        return (
            <div></div>
        )
    }

}

const SubCard = props => {

    let scType;

    if (props.type === "P") {
        scType = "PROJECT";
    }
    else if (props.type === "R") {
        scType = "RESEARCH";
    }

    return (
        <div className={styles.subCard}>
            <div className={styles.subCardTitle}>
                <span>
                    <FontAwesomeIcon icon={props.icon} /> &nbsp; {scType}
                </span>
            </div>
            <span>
                <h5>
                    {props.title}
                </h5>
                <p> 
                    {props.summary} 
                </p>
            </span>
            <div className={styles.subCardGo}>
                <span>
                    <a onClick={props.action}>
                    <FontAwesomeIcon icon={faArrowRight} /> 
                    </a>
                </span>
            </div>
            
        </div>
    )
}

const IntroCard = props => {
    const [curCardTitle, setCurCardTitle] = React.useState('Intro');
    const [curPath, setPath] = React.useState(['Intro']);
    
    const handleContentSwitch = (content) => {
        var path = [...curPath];
        if (content === "Intro") {
            setPath(['Intro']);
        }
        else if (path.indexOf(content) === -1) {
            path.push(content);
            setPath(path);
        }
        
        setCurCardTitle(content);
            
    };
    

    return (
    <div className={classNames(styles.content,         
                                props.colorN === 0 && styles.contentColor,
                                props.colorN === 1 && styles.contentColorOne,
                                props.colorN === 2 && styles.contentColorTwo,
                                props.colorN === 3 && styles.contentColorThree)}>
        <Path path={curPath} switch={handleContentSwitch}/>
        <div className={classNames(props.colorN === 0 && styles.cardColor, 
                                    props.colorN === 1 && styles.cardColorOne,  
                                    props.colorN === 2 && styles.cardColorTwo,
                                    props.colorN === 3 && styles.cardColorThree,
                                    styles.card, props.animate && styles.up)}>
            <h2>Hi</h2>
            <hr />
            <Grid gridMarginX>
                <Cell small={12} medium={3} large={3} xlarge={3}>
                    <div className={styles.cardImage}>
                        <img className ={styles.cardImage}src="https://i.gifer.com/NYRT.gif" alt="intro" ></img>
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
                                If you'd like to collaborate on a project, please feel free to reach out. <span>😀</span>
                            </p>
        
                        </span>
                    </div>
                </Cell>
            </Grid>
        </div>
    </div>
    )
};

const ProjectCard = props => {

    const [curCardTitle, setCurCardTitle] = React.useState('Projects');
    const [curPath, setPath] = React.useState(['Projects']);
    
    const handleContentSwitch = (content) => {
        var path = [...curPath];
        if (content === "Projects") {
            setPath(['Projects']);
        }
        else if (path.indexOf(content) === -1) {
            path.push(content);
            setPath(path);
        }
        
        setCurCardTitle(content);
            
    };
    

    return (
        <div className={classNames(styles.content,         
                                    props.colorN === 0 && styles.contentColor,
                                    props.colorN === 1 && styles.contentColorOne,
                                    props.colorN === 2 && styles.contentColorTwo,
                                    props.colorN === 3 && styles.contentColorThree)}>
            <Path path={curPath} switch={handleContentSwitch}/>
            <div className={classNames(props.colorN === 0 && styles.cardColor, 
                                        props.colorN === 1 && styles.cardColorOne,  
                                        props.colorN === 2 && styles.cardColorTwo,
                                        props.colorN === 3 && styles.cardColorThree,
                                        styles.card, props.animate && styles.up)}>
                <h2>{curCardTitle}</h2>
                <hr />
                <Grid>
                    <Cell small={12} medium={12} large={12} xlarge={12}>
                        <CardBody content={curCardTitle} switch={handleContentSwitch}/>
                    </Cell>
                </Grid>
            </div>
        </div>
    )
};

const ResearchCard = props => {

    const [curCardTitle, setCurCardTitle] = React.useState('Research');
    const [curPath, setPath] = React.useState(['Research']);

    const handleContentSwitch = (content) => {
        var path = [...curPath];
        if (content === "Research") {
            setPath(['Research']);
        }
        else if (path.indexOf(content) === -1) {
            path.push(content);
            setPath(path);
        }
        
        setCurCardTitle(content);
            
    };

    return (
        <div className={classNames(styles.content,         
                                    props.colorN === 0 && styles.contentColor,
                                    props.colorN === 1 && styles.contentColorOne,
                                    props.colorN === 2 && styles.contentColorTwo,
                                    props.colorN === 3 && styles.contentColorThree)}>
            <Path path={curPath} switch={handleContentSwitch}/>
            <div className={classNames(props.colorN === 0 && styles.cardColor, 
                                        props.colorN === 1 && styles.cardColorOne,  
                                        props.colorN === 2 && styles.cardColorTwo,
                                        props.colorN === 3 && styles.cardColorThree,
                                        styles.card, props.animate && styles.up)}>
                <h2>{curCardTitle}</h2>
                <hr />
                <Grid>
                    <Cell small={12} medium={12} large={12} xlarge={12}>
                        <CardBody content={curCardTitle} switch={handleContentSwitch}/>
                    </Cell>
                </Grid>
            </div>
        </div>
    )
};

const TextSummary = props => {
    return (
        <div className={styles.resultTable}>
            <table>
            {props.content.map(item => (
                <div>
                <thead key={item.key}>
                    <tr>
                        <th width="100%">{item.key}</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{item.val}</td>
                    </tr>
                </tbody>
                </div>
            ))}
            </table>
        </div>
    );
};

function GetWinSize() {
    const isClient = typeof window === 'object';

    function getSize() {
        return {
            width: isClient ? window.innerWidth : undefined,
            height: isClient ? window.innerHeight : undefined
        };
    }

    const [windowSize, setWindowSize] = React.useState(getSize());

    useEffect(() => {
        if (!isClient) {
            return false;
        }
        function handleResize() {
            setWindowSize(getSize());
        }
        
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return windowSize;
}

export default App;
