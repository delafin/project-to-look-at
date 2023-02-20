import React, {useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import './placeOrder.css';
import {Form} from 'react-bootstrap';
import {Modal} from '@mui/material';

const initialState = {
    order_typeError: '',
    paper_typeError: '',
    academic_yearError: '',
    deadlineError: '',
    spacingError: '',
    disciplineError: '',
    chartsSlidesPagesError: ''
};

export default function PlaceOrder(){

    const [pages, setPages] = useState(1);
    const [charts, setCharts] = useState(0);
    const [slides, setSlides] = useState(0);
    const [references, setReferences] = useState(0);
    const [spacing, setSpacing] = useState('Double');
    const [redirect, setRedirect] = useState(false);
    const [ref, setref] = useState('');
    const [error, setError] = useState(false);
    const [validators, setValidators] = useState(initialState);
    const [open, setOpen] = useState(false);
    const [orderType, setOrderType] = useState('Academic Writing');

    const [curStep, setCurStep] = useState('FirstStep');

    const [details, setDetails] = useState({
        pages: 0,
        charts: 0,
        slides: 0,
        paper_type: '',
        subject: '',
        instructions: '',
        instruction_file: '',
        paper_format: '',
        references: 0,
        order_type: 'Academic Writing',
        academic_year: '',
        title: '',
        deadline: '',
        paper_level: '',
        upgrade: '',
        task_size: '',
        programming_category: '',
        prog_language: '',
        software: '',
        discipline: '',
        spacing: '',
        amount: 0
    });

    useEffect(() => {
        document.title = 'To The Moon Experts - Order'
    },[]);

    useEffect(() => {
        setDetails(details => ({
            ...details, pages: pages, charts: charts, slides: slides, references: references
        }))

    }, [slides, charts, pages, references]);

    useEffect(() => {
        if(orderType === 'Academic Writing'){
            setDetails(prevState => ({
                ...prevState, paper_level: 'Basic', software: '', subject: '', programming_category: '', prog_language: '', task_size: '', paper_type: 'Essay', paper_format: 'MLA', academic_year: 'High School', spacing: 'Double',  discipline: 'Philosophy', deadline: '4 Hours'
            }))
            setPages(1)
        }else if(orderType === 'Programming Assignment'){
            setDetails(prevState => ({
                ...prevState, paper_level: '', subject: '', paper_format: '', academic_year: '', spacing: '', title: '', paper_type: '', upgrade: '', discipline: '', deadline: '24 Hours', task_size: 'Extra small', software: '', pages: 0, references: 0, charts: 0, slides: 0
            }))
            setPages(0)
            setCharts(0)
            setSlides(0)
            setReferences(0)
        }else if(orderType === 'Calculations Assignment'){
            setDetails(prevState => ({
                ...prevState, discipline: '', paper_level: '', paper_format: '', academic_year: '', title: '', upgrade: '', paper_type: '', programming_category: '', prog_language: '', deadline: '24 Hours', task_size: 'Extra small', spacing: '', pages: 0, references: 0, charts: 0, slides: 0
            }))
            setPages(0)
            setCharts(0)
            setSlides(0)
            setReferences(0)
        }
    },[orderType]);

    const incrementPages = (event) =>{
        event.preventDefault()
        setPages(pages => pages + 1,)
    };

    const incrementCharts = (event) =>{
        event.preventDefault()
        setCharts(charts => charts + 1,)
    };

    const incrementSlides = (event) =>{
        event.preventDefault()
        setSlides(slides => slides + 1,)
    };

    const incrementReferences = (event) =>{
        event.preventDefault()
        setReferences(references => references + 1,)
    };

    const decrementPages = (event) =>{
        event.preventDefault()
        setPages(pages => Math.max(pages - 1, 0))
    };

    const decrementCharts = (event) =>{
        event.preventDefault()
        setCharts(charts => Math.max(charts - 1, 0))
    };

    const decrementSlides = (event) =>{
        event.preventDefault()
        setSlides(slides => Math.max(slides - 1, 0))
    };

    const decrementReferences = (event) =>{
        event.preventDefault()
        setReferences(references => Math.max(references - 1, 0))
    };

    // Summary display

    let pageStyle, chartStyle, slideStyle, paperLevelStyle, categoryStyle, softwareStyle, writingStyle;

    if (pages < 1) {
        pageStyle = {
            display: 'None'
        }
    }

    if (slides < 1) {
        slideStyle = {
            display: 'None'
        }
    }

    if (charts < 1) {
        chartStyle = {
            display: 'None'
        }
    }

    if (details.paper_level === 'Basic' || details.order_type === 'Programming' || details.paper_level === '' || details.order_type === 'Calculations'){
        paperLevelStyle = {
            display: 'None'
        }
    }

    if (details.order_type === 'Academic Writing' || details.order_type === 'Calculations Assignment'){
        categoryStyle = {
            display: 'none',
            marginLeft: '30px'
        }
    }

    if (details.order_type === 'Academic Writing' || details.order_type === 'Programming Assignment'){
        softwareStyle = {
            display: 'none',
            marginLeft: '30px'
        }
    }

    if (details.order_type === 'Programming Assignment' || details.order_type === 'Calculations Assignment'){
        writingStyle = {
            display: 'none',
            marginLeft: '30px'
        }
    }

    // Price Calculations

    const [level2, setLevel2] = useState('High School');

    const handleChange = (e) => {
        setDetails(details => ({
            ...details, academic_year: e.target.value
        }))
        setLevel2(e.target.value)
    };

    const handleSpacing = (e) => {
        setDetails(prevState => ({
            ...prevState, spacing: e.target.value
        }))
        setSpacing(e.target.value)
    };

    let no_words;

    if(spacing === 'Single'){
        no_words = 550
    }else if(spacing === 'Double'){
        no_words = 275
    };

    let spacing_value;

    function pageSwitch(){
        if (level2 === 'High School'){
            switch(details.academic_year === 'High School'){
                case details.deadline === '4 Hours':
                    if(spacing === 'Single'){
                        spacing_value = (39 * 2).toFixed(2)
                        return (pages * 39 * 2).toFixed(2)
                    }else if(spacing === 'Double'){
                        spacing_value = (39).toFixed(2)
                        return (pages * 39).toFixed(2)
                    }
                    break;
                case details.deadline === '8 Hours':
                    if(spacing === 'Single'){
                        spacing_value = (34 * 2).toFixed(2)
                        return (pages * 34 * 2).toFixed(2)
                    }else if(spacing === 'Double'){
                        spacing_value = (34).toFixed(2)
                        return (pages * 34).toFixed(2)
                    }
                    break;
                case details.deadline === '24 Hours':
                    if(spacing === 'Single'){
                        spacing_value = (27 * 2).toFixed(2)
                        return (pages * 27 * 2).toFixed(2)
                    }else if(spacing === 'Double'){
                        spacing_value = (27).toFixed(2)
                        return (pages * 27).toFixed(2)
                    }
                    break;
                case details.deadline === '2 Days':
                    if(spacing === 'Single'){
                        spacing_value = (24 * 2).toFixed(2)
                        return (pages * 24 * 2).toFixed(2)
                    }else if(spacing === 'Double'){
                        spacing_value = (24).toFixed(2)
                        return (pages * 24).toFixed(2)
                    }
                    break;
                case details.deadline === '3 Days':
                    if(spacing === 'Single'){
                        spacing_value = (20 * 2).toFixed(2)
                        return (pages * 20 * 2).toFixed(2)
                    }else if(spacing === 'Double'){
                        spacing_value = (20).toFixed(2)
                        return (pages * 20).toFixed(2)
                    }
                    break;
                case details.deadline === '5 Days':
                    if(spacing === 'Single'){
                        spacing_value = (18 * 2).toFixed(2)
                        return (pages * 18 * 2).toFixed(2)
                    }else if(spacing === 'Double'){
                        spacing_value = (18).toFixed(2)
                        return (pages * 18).toFixed(2)
                    }
                    break;
                case details.deadline === '7 Days':
                    if(spacing === 'Single'){
                        spacing_value = (16 * 2).toFixed(2)
                        return (pages * 16 * 2).toFixed(2)
                    }else if(spacing === 'Double'){
                        spacing_value = (16).toFixed(2)
                        return (pages * 16).toFixed(2)
                    }
                    break;
                case details.deadline === '14 Days':
                    if(spacing === 'Single'){
                        spacing_value = (10 * 2).toFixed(2)
                        return (pages * 10 * 2).toFixed(2)
                    }else if(spacing === 'Double'){
                        spacing_value = (10).toFixed(2)
                        return (pages * 10).toFixed(2)
                    }
                    break;
                default:
                    return 0
            }
        } else if (level2 === 'Undergraduate (years 1-2)'){
            switch(details.academic_year === 'Undergraduate (years 1-2)'){
                case details.deadline === '4 Hours':
                    if(spacing === 'Single'){
                        spacing_value = (43 * 2).toFixed(2)
                        return (pages * 43 * 2).toFixed(2)
                    }else if(spacing === 'Double'){
                        spacing_value = (43).toFixed(2)
                        return (pages * 43).toFixed(2)
                    }
                    break;
                case details.deadline === '8 Hours':
                    if(spacing === 'Single'){
                        spacing_value = (39 * 2).toFixed(2)
                        return (pages * 39 * 2).toFixed(2)
                    }else if(spacing === 'Double'){
                        spacing_value = (39).toFixed(2)
                        return (pages * 39).toFixed(2)
                    }
                    break;
                case details.deadline === '24 Hours':
                    if(spacing === 'Single'){
                        spacing_value = (30 * 2).toFixed(2)
                        return (pages * 30 * 2).toFixed(2)
                    }else if(spacing === 'Double'){
                        spacing_value = (30).toFixed(2)
                        return (pages * 30).toFixed(2)
                    }
                    break;
                case details.deadline === '2 Days':
                    if(spacing === 'Single'){
                        spacing_value = (26 * 2).toFixed(2)
                        return (pages * 26 * 2).toFixed(2)
                    }else if(spacing === 'Double'){
                        spacing_value = (26).toFixed(2)
                        return (pages * 26).toFixed(2)
                    }
                    break;
                case details.deadline === '3 Days':
                    if(spacing === 'Single'){
                        spacing_value = (24 * 2).toFixed(2)
                        return (pages * 24 * 2).toFixed(2)
                    }else if(spacing === 'Double'){
                        spacing_value = (24).toFixed(2)
                        return (pages * 24).toFixed(2)
                    }
                    break;
                case details.deadline === '5 Days':
                    if(spacing === 'Single'){
                        spacing_value = (19 * 2).toFixed(2)
                        return (pages * 19 * 2).toFixed(2)
                    }else if(spacing === 'Double'){
                        spacing_value = (19).toFixed(2)
                        return (pages * 19).toFixed(2)
                    }
                    break;
                case details.deadline === '7 Days':
                    if(spacing === 'Single'){
                        spacing_value = (17 * 2).toFixed(2)
                        return (pages * 17 * 2).toFixed(2)
                    }else if(spacing === 'Double'){
                        spacing_value = (17).toFixed(2)
                        return (pages * 17).toFixed(2)
                    }
                    break;
                case details.deadline === '14 Days':
                    if(spacing === 'Single'){
                        spacing_value = (15 * 2).toFixed(2)
                        return (pages * 15 * 2).toFixed(2)
                    }else if(spacing === 'Double'){
                        spacing_value = (15).toFixed(2)
                        return (pages * 15).toFixed(2)
                    }
                    break;
                default:
                    return 0
            }
        } else if (level2 === 'Undergraduate (years 3-4)'){
            switch(details.academic_year === 'Undergraduate (years 3-4)'){
                case details.deadline === '4 Hours':
                    if(spacing === 'Single'){
                        spacing_value = (51 * 2).toFixed(2)
                        return (pages * 51 * 2).toFixed(2)
                    }else if(spacing === 'Double'){
                        spacing_value = (51).toFixed(2)
                        return (pages * 51).toFixed(2)
                    }
                    break;
                case details.deadline === '8 Hours':
                    if(spacing === 'Single'){
                        spacing_value = (41 * 2).toFixed(2)
                        return (pages * 41 * 2).toFixed(2)
                    }else if(spacing === 'Double'){
                        spacing_value = (41).toFixed(2)
                        return (pages * 41).toFixed(2)
                    }
                    break;
                case details.deadline === '24 Hours':
                    if(spacing === 'Single'){
                        spacing_value = (32 * 2).toFixed(2)
                        return (pages * 32 * 2).toFixed(2)
                    }else if(spacing === 'Double'){
                        spacing_value = (32).toFixed(2)
                        return (pages * 32).toFixed(2)
                    }
                    break;
                case details.deadline === '2 Days':
                    if(spacing === 'Single'){
                        spacing_value = (30 * 2).toFixed(2)
                        return (pages * 30 * 2).toFixed(2)
                    }else if(spacing === 'Double'){
                        spacing_value = (30).toFixed(2)
                        return (pages * 30).toFixed(2)
                    }
                    break;
                case details.deadline === '3 Days':
                    if(spacing === 'Single'){
                        spacing_value = (28 * 2).toFixed(2)
                        return (pages * 28 * 2).toFixed(2)
                    }else if(spacing === 'Double'){
                        spacing_value = (28).toFixed(2)
                        return (pages * 28).toFixed(2)
                    }
                    break;
                case details.deadline === '5 Days':
                    if(spacing === 'Single'){
                        spacing_value = (23 * 2).toFixed(2)
                        return (pages * 23 * 2).toFixed(2)
                    }else if(spacing === 'Double'){
                        spacing_value = (23).toFixed(2)
                        return (pages * 23).toFixed(2)
                    }
                    break;
                case details.deadline === '7 Days':
                    if(spacing === 'Single'){
                        spacing_value = (21 * 2).toFixed(2)
                        return (pages * 21 * 2).toFixed(2)
                    }else if(spacing === 'Double'){
                        spacing_value = (21).toFixed(2)
                        return (pages * 21).toFixed(2)
                    }
                    break;
                case details.deadline === '14 Days':
                    if(spacing === 'Single'){
                        spacing_value = (20 * 2).toFixed(2)
                        return (pages * 20 * 2).toFixed(2)
                    }else if(spacing === 'Double'){
                        spacing_value = (20).toFixed(2)
                        return (pages * 20).toFixed(2)
                    }
                    break;
                default:
                    return 0
            }
        } else if (level2 === 'Graduate'){
            switch(details.academic_year === 'Graduate'){
                case details.deadline === '4 Hours':
                    if(spacing === 'Single'){
                        spacing_value = (61 * 2).toFixed(2)
                        return (pages * 61 * 2).toFixed(2)
                    }else if(spacing === 'Double'){
                        spacing_value = (61).toFixed(2)
                        return (pages * 61).toFixed(2)
                    }
                    break;
                case details.deadline === '8 Hours':
                    if(spacing === 'Single'){
                        spacing_value = (48 * 2).toFixed(2)
                        return (pages * 48 * 2).toFixed(2)
                    }else if(spacing === 'Double'){
                        spacing_value = (48).toFixed(2)
                        return (pages * 48).toFixed(2)
                    }
                    break;
                case details.deadline === '24 Hours':
                    if(spacing === 'Single'){
                        spacing_value = (39 * 2).toFixed(2)
                        return (pages * 39 * 2).toFixed(2)
                    }else if(spacing === 'Double'){
                        spacing_value = (39).toFixed(2)
                        return (pages * 39).toFixed(2)
                    }
                    break;
                case details.deadline === '2 Days':
                    if(spacing === 'Single'){
                        spacing_value = (36 * 2).toFixed(2)
                        return (pages * 36 * 2).toFixed(2)
                    }else if(spacing === 'Double'){
                        spacing_value = (36).toFixed(2)
                        return (pages * 36).toFixed(2)
                    }
                    break;
                case details.deadline === '3 Days':
                    if(spacing === 'Single'){
                        spacing_value = (33 * 2).toFixed(2)
                        return (pages * 33 * 2).toFixed(2)
                    }else if(spacing === 'Double'){
                        spacing_value = (33).toFixed(2)
                        return (pages * 33).toFixed(2)
                    }
                    break;
                case details.deadline === '5 Days':
                    if(spacing === 'Single'){
                        return (pages * 29 * 2).toFixed(2)
                    }else if(spacing === 'Double'){
                        return (pages * 29).toFixed(2)
                    }
                    break;
                case details.deadline === '7 Days':
                    if(spacing === 'Single'){
                        spacing_value = (27 * 2).toFixed(2)
                        return (pages * 27 * 2).toFixed(2)
                    }else if(spacing === 'Double'){
                        spacing_value = (27).toFixed(2)
                        return (pages * 27).toFixed(2)
                    }
                    break;
                case details.deadline === '14 Days':
                    if(spacing === 'Single'){
                        spacing_value = (25 * 2).toFixed(2)
                        return (pages * 25 * 2).toFixed(2)
                    }else if(spacing === 'Double'){
                        spacing_value = (25).toFixed(2)
                        return (pages * 25).toFixed(2)
                    }
                    break;
                default:
                    return 0
            }
        } else if (level2 === 'PhD'){
            switch(details.academic_year === 'PhD'){
                case details.deadline === '4 Hours':
                    if(spacing === 'Single'){
                        spacing_value = (73 * 2).toFixed(2)
                        return (pages * 73 * 2).toFixed(2)
                    }else if(spacing === 'Double'){
                        spacing_value = (73).toFixed(2)
                        return (pages * 73).toFixed(2)
                    }
                    break;
                case details.deadline === '8 Hours':
                    if(spacing === 'Single'){
                        spacing_value = (58 * 2).toFixed(2)
                        return (pages * 58 * 2).toFixed(2)
                    }else if(spacing === 'Double'){
                        spacing_value = (58).toFixed(2)
                        return (pages * 58).toFixed(2)
                    }
                    break;
                case details.deadline === '24 Hours':
                    if(spacing === 'Single'){
                        spacing_value = (50 * 2).toFixed(2)
                        return (pages * 50 * 2).toFixed(2)
                    }else if(spacing === 'Double'){
                        spacing_value = (50).toFixed(2)
                        return (pages * 50).toFixed(2)
                    }
                    break;
                case details.deadline === '2 Days':
                    if(spacing === 'Single'){
                        spacing_value = (45 * 2).toFixed(2)
                        return (pages * 45 * 2).toFixed(2)
                    }else if(spacing === 'Double'){
                        spacing_value = (45).toFixed(2)
                        return (pages * 45).toFixed(2)
                    }
                    break;
                case details.deadline === '3 Days':
                    if(spacing === 'Single'){
                        spacing_value = (37 * 2).toFixed(2)
                        return (pages * 37 * 2).toFixed(2)
                    }else if(spacing === 'Double'){
                        spacing_value = (37).toFixed(2)
                        return (pages * 37).toFixed(2)
                    }
                    break;
                case details.deadline === '5 Days':
                    if(spacing === 'Single'){
                        spacing_value = (35 * 2).toFixed(2)
                        return (pages * 35 * 2).toFixed(2)
                    }else if(spacing === 'Double'){
                        spacing_value = (35).toFixed(2)
                        return (pages * 35).toFixed(2)
                    }
                    break;
                case details.deadline === '7 Days':
                    if(spacing === 'Single'){
                        spacing_value = (31 * 2).toFixed(2)
                        return (pages * 31 * 2).toFixed(2)
                    }else if(spacing === 'Double'){
                        spacing_value = (31).toFixed(2)
                        return (pages * 31).toFixed(2)
                    }
                    break;
                case details.deadline === '14 Days':
                    if(spacing === 'Single'){
                        spacing_value = (29 * 2).toFixed(2)
                        return (pages * 29 * 2).toFixed(2)
                    }else if(spacing === 'Double'){
                        spacing_value = (29).toFixed(2)
                        return (pages * 29).toFixed(2)
                    }
                    break;
                default:
                    return 0
            }
        }
    }

    function chartSwitch(){
        if (level2 === 'High School'){
            switch(details.academic_year === 'High School'){
                case details.deadline === '4 Hours':
                    return (charts * 39/2).toFixed(2)
                case details.deadline === '8 Hours':
                    return (charts * 34/2).toFixed(2)
                case details.deadline === '24 Hours':
                    return (charts * 27/2).toFixed(2)
                case details.deadline === '2 Days':
                    return (charts * 24/2).toFixed(2)
                case details.deadline === '3 Days':
                    return (charts * 20/2).toFixed(2)
                case details.deadline === '5 Days':
                    return (charts * 18/2).toFixed(2)
                case details.deadline === '7 Days':
                    return (charts * 16/2).toFixed(2)
                case details.deadline === '14 Days':
                    return (charts * 10/2).toFixed(2)
                default:
                    return 0
            }
        } else if (level2 === 'Undergraduate (years 1-2)'){
            switch(details.academic_year === 'Undergraduate (years 1-2)'){
                case details.deadline === '4 Hours':
                    return (charts * 43/2).toFixed(2)
                case details.deadline === '8 Hours':
                    return (charts * 39/2).toFixed(2)
                case details.deadline === '24 Hours':
                    return (charts * 30/2).toFixed(2)
                case details.deadline === '2 Days':
                    return (charts * 26/2).toFixed(2)
                case details.deadline === '3 Days':
                    return (charts * 24/2).toFixed(2)
                case details.deadline === '5 Days':
                    return (charts * 19/2).toFixed(2)
                case details.deadline === '7 Days':
                    return (charts * 17/2).toFixed(2)
                case details.deadline === '14 Days':
                    return (charts * 15/2).toFixed(2)
                default:
                    return 0
            }
        } else if (level2 === 'Undergraduate (years 3-4)'){
            switch(details.academic_year === 'Undergraduate (years 3-4)'){
                case details.deadline === '4 Hours':
                    return (charts * 51/2).toFixed(2)
                case details.deadline === '8 Hours':
                    return (charts * 41/2).toFixed(2)
                case details.deadline === '24 Hours':
                    return (charts * 32/2).toFixed(2)
                case details.deadline === '2 Days':
                    return (charts * 30/2).toFixed(2)
                case details.deadline === '3 Days':
                    return (charts * 28/2).toFixed(2)
                case details.deadline === '5 Days':
                    return (charts * 23/2).toFixed(2)
                case details.deadline === '7 Days':
                    return (charts * 21/2).toFixed(2)
                case details.deadline === '14 Days':
                    return (charts * 20/2).toFixed(2)
                default:
                    return 0
            }
        } else if (level2 === 'Graduate'){
            switch(details.academic_year === 'Graduate'){
                case details.deadline === '4 Hours':
                    return (charts * 61/2).toFixed(2)
                case details.deadline === '8 Hours':
                    return (charts * 48/2).toFixed(2)
                case details.deadline === '24 Hours':
                    return (charts * 39/2).toFixed(2)
                case details.deadline === '2 Days':
                    return (charts * 36/2).toFixed(2)
                case details.deadline === '3 Days':
                    return (charts * 33/2).toFixed(2)
                case details.deadline === '5 Days':
                    return (charts * 29/2).toFixed(2)
                case details.deadline === '7 Days':
                    return (charts * 27/2).toFixed(2)
                case details.deadline === '14 Days':
                    return (charts * 25/2).toFixed(2)
                default:
                    return 0
            }
        } else if (level2 === 'PhD'){
            switch(details.academic_year === 'PhD'){
                case details.deadline === '4 Hours':
                    return (charts * 73/2).toFixed(2)
                case details.deadline === '8 Hours':
                    return (charts * 58/2).toFixed(2)
                case details.deadline === '24 Hours':
                    return (charts * 50/2).toFixed(2)
                case details.deadline === '2 Days':
                    return (charts * 45/2).toFixed(2)
                case details.deadline === '3 Days':
                    return (charts * 37/2).toFixed(2)
                case details.deadline === '5 Days':
                    return (charts * 35/2).toFixed(2)
                case details.deadline === '7 Days':
                    return (charts * 31/2).toFixed(2)
                case details.deadline === '14 Days':
                    return (charts * 29/2).toFixed(2)
                default:
                    return 0
            }
        }
    }

    function slideSwitch(){
        if (level2 === 'High School'){
            switch(details.academic_year === 'High School'){
                case details.deadline === '4 Hours':
                    return (slides * 39/2).toFixed(2)
                case details.deadline === '8 Hours':
                    return (slides * 34/2).toFixed(2)
                case details.deadline === '24 Hours':
                    return (slides * 27/2).toFixed(2)
                case details.deadline === '2 Days':
                    return (slides * 24/2).toFixed(2)
                case details.deadline === '3 Days':
                    return (slides * 20/2).toFixed(2)
                case details.deadline === '5 Days':
                    return (slides * 18/2).toFixed(2)
                case details.deadline === '7 Days':
                    return (slides * 16/2).toFixed(2)
                case details.deadline === '14 Days':
                    return (slides * 10/2).toFixed(2)
                default:
                    return 0
            }
        } else if (level2 === 'Undergraduate (years 1-2)'){
            switch(details.academic_year === 'Undergraduate (years 1-2)'){
                case details.deadline === '4 Hours':
                    return (slides * 43/2).toFixed(2)
                case details.deadline === '8 Hours':
                    return (slides * 39/2).toFixed(2)
                case details.deadline === '24 Hours':
                    return (slides * 30/2).toFixed(2)
                case details.deadline === '2 Days':
                    return (slides * 26/2).toFixed(2)
                case details.deadline === '3 Days':
                    return (slides * 24/2).toFixed(2)
                case details.deadline === '5 Days':
                    return (slides * 19/2).toFixed(2)
                case details.deadline === '7 Days':
                    return (slides * 17/2).toFixed(2)
                case details.deadline === '14 Days':
                    return (slides * 15/2).toFixed(2)
                default:
                    return 0
            }
        } else if (level2 === 'Undergraduate (years 3-4)'){
            switch(details.academic_year === 'Undergraduate (years 3-4)'){
                case details.deadline === '4 Hours':
                    return (slides * 51/2).toFixed(2)
                case details.deadline === '8 Hours':
                    return (slides * 41/2).toFixed(2)
                case details.deadline === '24 Hours':
                    return (slides * 32/2).toFixed(2)
                case details.deadline === '2 Days':
                    return (slides * 30/2).toFixed(2)
                case details.deadline === '3 Days':
                    return (slides * 28/2).toFixed(2)
                case details.deadline === '5 Days':
                    return (slides * 23/2).toFixed(2)
                case details.deadline === '7 Days':
                    return (slides * 21/2).toFixed(2)
                case details.deadline === '14 Days':
                    return (slides * 20/2).toFixed(2)
                default:
                    return 0
            }
        } else if (level2 === 'Graduate'){
            switch(details.academic_year === 'Graduate'){
                case details.deadline === '4 Hours':
                    return (slides * 61/2).toFixed(2)
                case details.deadline === '8 Hours':
                    return (slides * 48/2).toFixed(2)
                case details.deadline === '24 Hours':
                    return (slides * 39/2).toFixed(2)
                case details.deadline === '2 Days':
                    return (slides * 36/2).toFixed(2)
                case details.deadline === '3 Days':
                    return (slides * 33/2).toFixed(2)
                case details.deadline === '5 Days':
                    return (slides * 29/2).toFixed(2)
                case details.deadline === '7 Days':
                    return (slides * 27/2).toFixed(2)
                case details.deadline === '14 Days':
                    return (slides * 25/2).toFixed(2)
                default:
                    return 0
            }
        } else if (level2 === 'PhD'){
            switch(details.academic_year === 'PhD'){
                case details.deadline === '4 Hours':
                    return (slides * 73/2).toFixed(2)
                case details.deadline === '8 Hours':
                    return (slides * 58/2).toFixed(2)
                case details.deadline === '24 Hours':
                    return (slides * 50/2).toFixed(2)
                case details.deadline === '2 Days':
                    return (slides * 45/2).toFixed(2)
                case details.deadline === '3 Days':
                    return (slides * 37/2).toFixed(2)
                case details.deadline === '5 Days':
                    return (slides * 35/2).toFixed(2)
                case details.deadline === '7 Days':
                    return (slides * 31/2).toFixed(2)
                case details.deadline === '14 Days':
                    return (slides * 29/2).toFixed(2)
                default:
                    return 0
            }
        }
    }

    function pagepreferencePrice(){
        if (details.paper_level === 'Standard'){
            switch(details.academic_year === 'High School'){
                case details.deadline === '4 Hours':
                    return (pages * 9.75).toFixed(2)
                case details.deadline === '8 Hours':
                    return (pages * 8.50).toFixed(2)
                case details.deadline === '24 Hours':
                    return (pages * 6.75).toFixed(2)
                case details.deadline === '2 Days':
                    return (pages * 6.00).toFixed(2)
                case details.deadline === '3 Days':
                    return (pages * 5.00).toFixed(2)
                case details.deadline === '5 Days':
                    return (pages * 4.50).toFixed(2)
                case details.deadline === '7 Days':
                    return (pages * 4.00).toFixed(2)
                case details.deadline === '14 Days':
                    return (pages * 2.50).toFixed(2)
                default:
                    return 0
            }
        } else if (details.paper_level === 'Basic'){
            switch(details.academic_year === 'High School'){
                case details.deadline === '4 Hours':
                    return (0.00).toFixed(2)
                case details.deadline === '8 Hours':
                    return (0.00).toFixed(2)
                case details.deadline === '24 Hours':
                    return (0.00).toFixed(2)
                case details.deadline === '2 Days':
                    return (0.00).toFixed(2)
                case details.deadline === '3 Days':
                    return (0.00).toFixed(2)
                case details.deadline === '5 Days':
                    return (0.00).toFixed(2)
                case details.deadline === '7 Days':
                    return (0.00).toFixed(2)
                case details.deadline === '14 Days':
                    return (0.00).toFixed(2)
                default:
                    return 0
            }
        } else if (details.paper_level === 'Advanced'){
            switch(details.academic_year === 'High School'){
                case details.deadline === '4 Hours':
                    return (pages * 15.60).toFixed(2)
                case details.deadline === '8 Hours':
                    return (pages * 13.60).toFixed(2)
                case details.deadline === '24 Hours':
                    return (pages * 10.80).toFixed(2)
                case details.deadline === '2 Days':
                    return (pages * 9.60).toFixed(2)
                case details.deadline === '3 Days':
                    return (pages * 8.00).toFixed(2)
                case details.deadline === '5 Days':
                    return (pages * 7.20).toFixed(2)
                case details.deadline === '7 Days':
                    return (pages * 6.40).toFixed(2)
                case details.deadline === '14 Days':
                    return (pages * 4.00).toFixed(2)
                default:
                    return 0
            }
        }
        if (details.paper_level === 'Standard'){
            switch(details.academic_year === 'Undergraduate (years 1-2)'){
                case details.deadline === '4 Hours':
                    return (pages * 10.75).toFixed(2)
                case details.deadline === '8 Hours':
                    return (pages * 9.75).toFixed(2)
                case details.deadline === '24 Hours':
                    return (pages * 7.50).toFixed(2)
                case details.deadline === '2 Days':
                    return (pages * 6.50).toFixed(2)
                case details.deadline === '3 Days':
                    return (pages * 6.00).toFixed(2)
                case details.deadline === '5 Days':
                    return (pages * 4.75).toFixed(2)
                case details.deadline === '7 Days':
                    return (pages * 4.25).toFixed(2)
                case details.deadline === '14 Days':
                    return (pages * 3.75).toFixed(2)
                default:
                    return 0
            }
        } else if (details.paper_level === 'Basic'){
            switch(details.academic_year === 'Undergraduate (years 1-2)'){
                case details.deadline === '4 Hours':
                    return (0.00).toFixed(2)
                case details.deadline === '8 Hours':
                    return (0.00).toFixed(2)
                case details.deadline === '24 Hours':
                    return (0.00).toFixed(2)
                case details.deadline === '2 Days':
                    return (0.00).toFixed(2)
                case details.deadline === '3 Days':
                    return (0.00).toFixed(2)
                case details.deadline === '5 Days':
                    return (0.00).toFixed(2)
                case details.deadline === '7 Days':
                    return (0.00).toFixed(2)
                case details.deadline === '14 Days':
                    return (0.00).toFixed(2)
                default:
                    return 0
            }
        } else if (details.paper_level === 'Advanced'){
            switch(details.academic_year === 'Undergraduate (years 1-2)'){
                case details.deadline === '4 Hours':
                    return (pages * 17.20).toFixed(2)
                case details.deadline === '8 Hours':
                    return (pages * 15.60).toFixed(2)
                case details.deadline === '24 Hours':
                    return (pages * 12.00).toFixed(2)
                case details.deadline === '2 Days':
                    return (pages * 10.40).toFixed(2)
                case details.deadline === '3 Days':
                    return (pages * 9.60).toFixed(2)
                case details.deadline === '5 Days':
                    return (pages * 7.60).toFixed(2)
                case details.deadline === '7 Days':
                    return (pages * 6.80).toFixed(2)
                case details.deadline === '14 Days':
                    return (pages * 6.00).toFixed(2)
                default:
                    return 0
            }
        }
        if (details.paper_level === 'Standard'){
            switch(details.academic_year === 'Undergraduate (years 3-4)'){
                case details.deadline === '4 Hours':
                    return (pages * 12.75).toFixed(2)
                case details.deadline === '8 Hours':
                    return (pages * 10.25).toFixed(2)
                case details.deadline === '24 Hours':
                    return (pages * 8.00).toFixed(2)
                case details.deadline === '2 Days':
                    return (pages * 7.50).toFixed(2)
                case details.deadline === '3 Days':
                    return (pages * 7.00).toFixed(2)
                case details.deadline === '5 Days':
                    return (pages * 5.75).toFixed(2)
                case details.deadline === '7 Days':
                    return (pages * 5.25).toFixed(2)
                case details.deadline === '14 Days':
                    return (pages * 5.00).toFixed(2)
                default:
                    return 0
            }
        } else if (details.paper_level === 'Basic'){
            switch(details.academic_year === 'Undergraduate (years 3-4)'){
                case details.deadline === '4 Hours':
                    return (0.00).toFixed(2)
                case details.deadline === '8 Hours':
                    return (0.00).toFixed(2)
                case details.deadline === '24 Hours':
                    return (0.00).toFixed(2)
                case details.deadline === '2 Days':
                    return (0.00).toFixed(2)
                case details.deadline === '3 Days':
                    return (0.00).toFixed(2)
                case details.deadline === '5 Days':
                    return (0.00).toFixed(2)
                case details.deadline === '7 Days':
                    return (0.00).toFixed(2)
                case details.deadline === '14 Days':
                    return (0.00).toFixed(2)
                default:
                    return 0
            }
        }else if (details.paper_level === 'Advanced'){
            switch(details.academic_year === 'Undergraduate (years 3-4)'){
                case details.deadline === '4 Hours':
                    return (pages * 20.40).toFixed(2)
                case details.deadline === '8 Hours':
                    return (pages * 16.40).toFixed(2)
                case details.deadline === '24 Hours':
                    return (pages * 12.80).toFixed(2)
                case details.deadline === '2 Days':
                    return (pages * 12.00).toFixed(2)
                case details.deadline === '3 Days':
                    return (pages * 11.20).toFixed(2)
                case details.deadline === '5 Days':
                    return (pages * 9.20).toFixed(2)
                case details.deadline === '7 Days':
                    return (pages * 8.40).toFixed(2)
                case details.deadline === '14 Days':
                    return (pages * 8.00).toFixed(2)
                default:
                    return 0
            }
        }
        if (details.paper_level === 'Standard'){
            switch(details.academic_year === 'Graduate'){
                case details.deadline === '4 Hours':
                    return (pages * 15.25).toFixed(2)
                case details.deadline === '8 Hours':
                    return (pages * 12.00).toFixed(2)
                case details.deadline === '24 Hours':
                    return (pages * 9.75).toFixed(2)
                case details.deadline === '2 Days':
                    return (pages * 9.00).toFixed(2)
                case details.deadline === '3 Days':
                    return (pages * 8.25).toFixed(2)
                case details.deadline === '5 Days':
                    return (pages * 7.25).toFixed(2)
                case details.deadline === '7 Days':
                    return (pages * 6.75).toFixed(2)
                case details.deadline === '14 Days':
                    return (pages * 6.25).toFixed(2)
                default:
                    return 0
            }
        } else if (details.paper_level === 'Basic'){
            switch(details.academic_year === 'Graduate'){
                case details.deadline === '4 Hours':
                    return (0.00).toFixed(2)
                case details.deadline === '8 Hours':
                    return (0.00).toFixed(2)
                case details.deadline === '24 Hours':
                    return (0.00).toFixed(2)
                case details.deadline === '2 Days':
                    return (0.00).toFixed(2)
                case details.deadline === '3 Days':
                    return (0.00).toFixed(2)
                case details.deadline === '5 Days':
                    return (0.00).toFixed(2)
                case details.deadline === '7 Days':
                    return (0.00).toFixed(2)
                case details.deadline === '14 Days':
                    return (0.00).toFixed(2)
                default:
                    return 0
            }
        }else if (details.paper_level === 'Advanced'){
            switch(details.academic_year === 'Graduate'){
                case details.deadline === '4 Hours':
                    return (pages * 24.40).toFixed(2)
                case details.deadline === '8 Hours':
                    return (pages * 19.20).toFixed(2)
                case details.deadline === '24 Hours':
                    return (pages * 15.60).toFixed(2)
                case details.deadline === '2 Days':
                    return (pages * 14.40).toFixed(2)
                case details.deadline === '3 Days':
                    return (pages * 13.20).toFixed(2)
                case details.deadline === '5 Days':
                    return (pages * 11.60).toFixed(2)
                case details.deadline === '7 Days':
                    return (pages * 10.80).toFixed(2)
                case details.deadline === '14 Days':
                    return (pages * 10.00).toFixed(2)
                default:
                    return 0
            }
        }
        if (details.paper_level === 'Standard'){
            switch(details.academic_year === 'PhD'){
                case details.deadline === '4 Hours':
                    return (pages * 18.25).toFixed(2)
                case details.deadline === '8 Hours':
                    return (pages * 14.50).toFixed(2)
                case details.deadline === '24 Hours':
                    return (pages * 12.50).toFixed(2)
                case details.deadline === '2 Days':
                    return (pages * 11.25).toFixed(2)
                case details.deadline === '3 Days':
                    return (pages * 9.25).toFixed(2)
                case details.deadline === '5 Days':
                    return (pages * 8.75).toFixed(2)
                case details.deadline === '7 Days':
                    return (pages * 7.75).toFixed(2)
                case details.deadline === '14 Days':
                    return (pages * 7.25).toFixed(2)
                default:
                    return 0
            }
        } else if (details.paper_level === 'Basic'){
            switch(details.academic_year === 'PhD'){
                case details.deadline === '4 Hours':
                    return (0.00).toFixed(2)
                case details.deadline === '8 Hours':
                    return (0.00).toFixed(2)
                case details.deadline === '24 Hours':
                    return (0.00).toFixed(2)
                case details.deadline === '2 Days':
                    return (0.00).toFixed(2)
                case details.deadline === '3 Days':
                    return (0.00).toFixed(2)
                case details.deadline === '5 Days':
                    return (0.00).toFixed(2)
                case details.deadline === '7 Days':
                    return (0.00).toFixed(2)
                case details.deadline === '14 Days':
                    return (0.00).toFixed(2)
                default:
                    return 0
            }
        }else if (details.paper_level === 'Advanced'){
            switch(details.academic_year === 'PhD'){
                case details.deadline === '4 Hours':
                    return (pages * 29.20).toFixed(2)
                case details.deadline === '8 Hours':
                    return (pages * 23.20).toFixed(2)
                case details.deadline === '24 Hours':
                    return (pages * 20.00).toFixed(2)
                case details.deadline === '2 Days':
                    return (pages * 18.00).toFixed(2)
                case details.deadline === '3 Days':
                    return (pages * 14.80).toFixed(2)
                case details.deadline === '5 Days':
                    return (pages * 14.00).toFixed(2)
                case details.deadline === '7 Days':
                    return (pages * 12.40).toFixed(2)
                case details.deadline === '14 Days':
                    return (pages * 11.60).toFixed(2)
                default:
                    return 0
            }
        }
    }

    function chartpreferencePrice(){
        if (details.paper_level === 'Standard'){
            switch(details.academic_year === 'High School'){
                case details.deadline === '4 Hours':
                    return (charts * 9.75/2).toFixed(2)
                case details.deadline === '8 Hours':
                    return (charts * 8.50/2).toFixed(2)
                case details.deadline === '24 Hours':
                    return (charts * 6.75/2).toFixed(2)
                case details.deadline === '2 Days':
                    return (charts * 6.00/2).toFixed(2)
                case details.deadline === '3 Days':
                    return (charts * 5.00/2).toFixed(2)
                case details.deadline === '5 Days':
                    return (charts * 4.50/2).toFixed(2)
                case details.deadline === '7 Days':
                    return (charts * 4.00/2).toFixed(2)
                case details.deadline === '14 Days':
                    return (charts * 2.50/2).toFixed(2)
                default:
                    return 0
            }
        } else if (details.paper_level === 'Basic'){
            switch(details.academic_year === 'High School'){
                case details.deadline === '4 Hours':
                    return (0.00).toFixed(2)
                case details.deadline === '8 Hours':
                    return (0.00).toFixed(2)
                case details.deadline === '24 Hours':
                    return (0.00).toFixed(2)
                case details.deadline === '2 Days':
                    return (0.00).toFixed(2)
                case details.deadline === '3 Days':
                    return (0.00).toFixed(2)
                case details.deadline === '5 Days':
                    return (0.00).toFixed(2)
                case details.deadline === '7 Days':
                    return (0.00).toFixed(2)
                case details.deadline === '14 Days':
                    return (0.00).toFixed(2)
                default:
                    return 0
            }
        } else if (details.paper_level === 'Advanced'){
            switch(details.academic_year === 'High School'){
                case details.deadline === '4 Hours':
                    return (charts * 15.60/2).toFixed(2)
                case details.deadline === '8 Hours':
                    return (charts * 13.60/2).toFixed(2)
                case details.deadline === '24 Hours':
                    return (charts * 10.80/2).toFixed(2)
                case details.deadline === '2 Days':
                    return (charts * 9.60/2).toFixed(2)
                case details.deadline === '3 Days':
                    return (charts * 8.00/2).toFixed(2)
                case details.deadline === '5 Days':
                    return (charts * 7.20/2).toFixed(2)
                case details.deadline === '7 Days':
                    return (charts * 6.40/2).toFixed(2)
                case details.deadline === '14 Days':
                    return (charts * 4.00/2).toFixed(2)
                default:
                    return 0
            }
        }
        if (details.paper_level === 'Standard'){
            switch(details.academic_year === 'Undergraduate (years 1-2)'){
                case details.deadline === '4 Hours':
                    return (charts * 10.75/2).toFixed(2)
                case details.deadline === '8 Hours':
                    return (charts * 9.75/2).toFixed(2)
                case details.deadline === '24 Hours':
                    return (charts * 7.50/2).toFixed(2)
                case details.deadline === '2 Days':
                    return (charts * 6.50/2).toFixed(2)
                case details.deadline === '3 Days':
                    return (charts * 6.00/2).toFixed(2)
                case details.deadline === '5 Days':
                    return (charts * 4.75/2).toFixed(2)
                case details.deadline === '7 Days':
                    return (charts * 4.25/2).toFixed(2)
                case details.deadline === '14 Days':
                    return (charts * 3.75/2).toFixed(2)
                default:
                    return 0
            }
        } else if (details.paper_level === 'Basic'){
            switch(details.academic_year === 'Undergraduate (years 1-2)'){
                case details.deadline === '4 Hours':
                    return (0.00).toFixed(2)
                case details.deadline === '8 Hours':
                    return (0.00).toFixed(2)
                case details.deadline === '24 Hours':
                    return (0.00).toFixed(2)
                case details.deadline === '2 Days':
                    return (0.00).toFixed(2)
                case details.deadline === '3 Days':
                    return (0.00).toFixed(2)
                case details.deadline === '5 Days':
                    return (0.00).toFixed(2)
                case details.deadline === '7 Days':
                    return (0.00).toFixed(2)
                case details.deadline === '14 Days':
                    return (0.00).toFixed(2)
                default:
                    return 0
            }
        } else if (details.paper_level === 'Advanced'){
            switch(details.academic_year === 'Undergraduate (years 1-2)'){
                case details.deadline === '4 Hours':
                    return (charts * 17.20/2).toFixed(2)
                case details.deadline === '8 Hours':
                    return (charts * 15.60/2).toFixed(2)
                case details.deadline === '24 Hours':
                    return (charts * 12.00/2).toFixed(2)
                case details.deadline === '2 Days':
                    return (charts * 10.40/2).toFixed(2)
                case details.deadline === '3 Days':
                    return (charts * 9.60/2).toFixed(2)
                case details.deadline === '5 Days':
                    return (charts * 7.60/2).toFixed(2)
                case details.deadline === '7 Days':
                    return (charts * 6.80/2).toFixed(2)
                case details.deadline === '14 Days':
                    return (charts * 6.00/2).toFixed(2)
                default:
                    return 0
            }
        }
        if (details.paper_level === 'Standard'){
            switch(details.academic_year === 'Undergraduate (years 3-4)'){
                case details.deadline === '4 Hours':
                    return (charts * 12.75/2).toFixed(2)
                case details.deadline === '8 Hours':
                    return (charts * 10.25/2).toFixed(2)
                case details.deadline === '24 Hours':
                    return (charts * 8.00/2).toFixed(2)
                case details.deadline === '2 Days':
                    return (charts * 7.50/2).toFixed(2)
                case details.deadline === '3 Days':
                    return (charts * 7.00/2).toFixed(2)
                case details.deadline === '5 Days':
                    return (charts * 5.75/2).toFixed(2)
                case details.deadline === '7 Days':
                    return (charts * 5.25/2).toFixed(2)
                case details.deadline === '14 Days':
                    return (charts * 5.00/2).toFixed(2)
                default:
                    return 0
            }
        } else if (details.paper_level === 'Basic'){
            switch(details.academic_year === 'Undergraduate (years 3-4)'){
                case details.deadline === '4 Hours':
                    return (0.00).toFixed(2)
                case details.deadline === '8 Hours':
                    return (0.00).toFixed(2)
                case details.deadline === '24 Hours':
                    return (0.00).toFixed(2)
                case details.deadline === '2 Days':
                    return (0.00).toFixed(2)
                case details.deadline === '3 Days':
                    return (0.00).toFixed(2)
                case details.deadline === '5 Days':
                    return (0.00).toFixed(2)
                case details.deadline === '7 Days':
                    return (0.00).toFixed(2)
                case details.deadline === '14 Days':
                    return (0.00).toFixed(2)
                default:
                    return 0
            }
        }else if (details.paper_level === 'Advanced'){
            switch(details.academic_year === 'Undergraduate (years 3-4)'){
                case details.deadline === '4 Hours':
                    return (charts * 20.40/2).toFixed(2)
                case details.deadline === '8 Hours':
                    return (charts * 16.40/2).toFixed(2)
                case details.deadline === '24 Hours':
                    return (charts * 12.80/2).toFixed(2)
                case details.deadline === '2 Days':
                    return (charts * 12.00/2).toFixed(2)
                case details.deadline === '3 Days':
                    return (charts * 11.20/2).toFixed(2)
                case details.deadline === '5 Days':
                    return (charts * 9.20/2).toFixed(2)
                case details.deadline === '7 Days':
                    return (charts * 8.40/2).toFixed(2)
                case details.deadline === '14 Days':
                    return (charts * 8.00/2).toFixed(2)
                default:
                    return 0
            }
        }
        if (details.paper_level === 'Standard'){
            switch(details.academic_year === 'Graduate'){
                case details.deadline === '4 Hours':
                    return (charts * 15.25/2).toFixed(2)
                case details.deadline === '8 Hours':
                    return (charts * 12.00/2).toFixed(2)
                case details.deadline === '24 Hours':
                    return (charts * 9.75/2).toFixed(2)
                case details.deadline === '2 Days':
                    return (charts * 9.00/2).toFixed(2)
                case details.deadline === '3 Days':
                    return (charts * 8.25/2).toFixed(2)
                case details.deadline === '5 Days':
                    return (charts * 7.25/2).toFixed(2)
                case details.deadline === '7 Days':
                    return (charts * 6.75/2).toFixed(2)
                case details.deadline === '14 Days':
                    return (charts * 6.25/2).toFixed(2)
                default:
                    return 0
            }
        } else if (details.paper_level === 'Basic'){
            switch(details.academic_year === 'Graduate'){
                case details.deadline === '4 Hours':
                    return (0.00).toFixed(2)
                case details.deadline === '8 Hours':
                    return (0.00).toFixed(2)
                case details.deadline === '24 Hours':
                    return (0.00).toFixed(2)
                case details.deadline === '2 Days':
                    return (0.00).toFixed(2)
                case details.deadline === '3 Days':
                    return (0.00).toFixed(2)
                case details.deadline === '5 Days':
                    return (0.00).toFixed(2)
                case details.deadline === '7 Days':
                    return (0.00).toFixed(2)
                case details.deadline === '14 Days':
                    return (0.00).toFixed(2)
                default:
                    return 0
            }
        }else if (details.paper_level === 'Advanced'){
            switch(details.academic_year === 'Graduate'){
                case details.deadline === '4 Hours':
                    return (charts * 24.40/2).toFixed(2)
                case details.deadline === '8 Hours':
                    return (charts * 19.20/2).toFixed(2)
                case details.deadline === '24 Hours':
                    return (charts * 15.60/2).toFixed(2)
                case details.deadline === '2 Days':
                    return (charts * 14.40/2).toFixed(2)
                case details.deadline === '3 Days':
                    return (charts * 13.20/2).toFixed(2)
                case details.deadline === '5 Days':
                    return (charts * 11.60/2).toFixed(2)
                case details.deadline === '7 Days':
                    return (charts * 10.80/2).toFixed(2)
                case details.deadline === '14 Days':
                    return (charts * 10.00/2).toFixed(2)
                default:
                    return 0
            }
        }
        if (details.paper_level === 'Standard'){
            switch(details.academic_year === 'PhD'){
                case details.deadline === '4 Hours':
                    return (charts * 18.25/2).toFixed(2)
                case details.deadline === '8 Hours':
                    return (charts * 14.50/2).toFixed(2)
                case details.deadline === '24 Hours':
                    return (charts * 12.50/2).toFixed(2)
                case details.deadline === '2 Days':
                    return (charts * 11.25/2).toFixed(2)
                case details.deadline === '3 Days':
                    return (charts * 9.25/2).toFixed(2)
                case details.deadline === '5 Days':
                    return (charts * 8.75/2).toFixed(2)
                case details.deadline === '7 Days':
                    return (charts * 7.75/2).toFixed(2)
                case details.deadline === '14 Days':
                    return (charts * 7.25/2).toFixed(2)
                default:
                    return 0
            }
        } else if (details.paper_level === 'Basic'){
            switch(details.academic_year === 'PhD'){
                case details.deadline === '4 Hours':
                    return (0.00).toFixed(2)
                case details.deadline === '8 Hours':
                    return (0.00).toFixed(2)
                case details.deadline === '24 Hours':
                    return (0.00).toFixed(2)
                case details.deadline === '2 Days':
                    return (0.00).toFixed(2)
                case details.deadline === '3 Days':
                    return (0.00).toFixed(2)
                case details.deadline === '5 Days':
                    return (0.00).toFixed(2)
                case details.deadline === '7 Days':
                    return (0.00).toFixed(2)
                case details.deadline === '14 Days':
                    return (0.00).toFixed(2)
                default:
                    return 0
            }
        }else if (details.paper_level === 'Advanced'){
            switch(details.academic_year === 'PhD'){
                case details.deadline === '4 Hours':
                    return (charts * 29.20/2).toFixed(2)
                case details.deadline === '8 Hours':
                    return (charts * 23.20/2).toFixed(2)
                case details.deadline === '24 Hours':
                    return (charts * 20.00/2).toFixed(2)
                case details.deadline === '2 Days':
                    return (charts * 18.00/2).toFixed(2)
                case details.deadline === '3 Days':
                    return (charts * 14.80/2).toFixed(2)
                case details.deadline === '5 Days':
                    return (charts * 14.00/2).toFixed(2)
                case details.deadline === '7 Days':
                    return (charts * 12.40/2).toFixed(2)
                case details.deadline === '14 Days':
                    return (charts * 11.60/2).toFixed(2)
                default:
                    return 0
            }
        }
    }

    function slidepreferencePrice(){
        if (details.paper_level === 'Standard'){
            switch(details.academic_year === 'High School'){
                case details.deadline === '4 Hours':
                    return (slides * 9.75/2).toFixed(2)
                case details.deadline === '8 Hours':
                    return (slides * 8.50/2).toFixed(2)
                case details.deadline === '24 Hours':
                    return (slides * 6.75/2).toFixed(2)
                case details.deadline === '2 Days':
                    return (slides * 6.00/2).toFixed(2)
                case details.deadline === '3 Days':
                    return (slides * 5.00/2).toFixed(2)
                case details.deadline === '5 Days':
                    return (slides * 4.50/2).toFixed(2)
                case details.deadline === '7 Days':
                    return (slides * 4.00/2).toFixed(2)
                case details.deadline === '14 Days':
                    return (slides * 2.50/2).toFixed(2)
                default:
                    return 0
            }
        } else if (details.paper_level === 'Basic'){
            switch(details.academic_year === 'High School'){
                case details.deadline === '4 Hours':
                    return (0.00).toFixed(2)
                case details.deadline === '8 Hours':
                    return (0.00).toFixed(2)
                case details.deadline === '24 Hours':
                    return (0.00).toFixed(2)
                case details.deadline === '2 Days':
                    return (0.00).toFixed(2)
                case details.deadline === '3 Days':
                    return (0.00).toFixed(2)
                case details.deadline === '5 Days':
                    return (0.00).toFixed(2)
                case details.deadline === '7 Days':
                    return (0.00).toFixed(2)
                case details.deadline === '14 Days':
                    return (0.00).toFixed(2)
                default:
                    return 0
            }
        } else if (details.paper_level === 'Advanced'){
            switch(details.academic_year === 'High School'){
                case details.deadline === '4 Hours':
                    return (slides * 15.60/2).toFixed(2)
                case details.deadline === '8 Hours':
                    return (slides * 13.60/2).toFixed(2)
                case details.deadline === '24 Hours':
                    return (slides * 10.80/2).toFixed(2)
                case details.deadline === '2 Days':
                    return (slides * 9.60/2).toFixed(2)
                case details.deadline === '3 Days':
                    return (slides * 8.00/2).toFixed(2)
                case details.deadline === '5 Days':
                    return (slides * 7.20/2).toFixed(2)
                case details.deadline === '7 Days':
                    return (slides * 6.40/2).toFixed(2)
                case details.deadline === '14 Days':
                    return (slides * 4.00/2).toFixed(2)
                default:
                    return 0
            }
        }
        if (details.paper_level === 'Standard'){
            switch(details.academic_year === 'Undergraduate (years 1-2)'){
                case details.deadline === '4 Hours':
                    return (slides * 10.75/2).toFixed(2)
                case details.deadline === '8 Hours':
                    return (slides * 9.75/2).toFixed(2)
                case details.deadline === '24 Hours':
                    return (slides * 7.50/2).toFixed(2)
                case details.deadline === '2 Days':
                    return (slides * 6.50/2).toFixed(2)
                case details.deadline === '3 Days':
                    return (slides * 6.00/2).toFixed(2)
                case details.deadline === '5 Days':
                    return (slides * 4.75/2).toFixed(2)
                case details.deadline === '7 Days':
                    return (slides * 4.25/2).toFixed(2)
                case details.deadline === '14 Days':
                    return (slides * 3.75/2).toFixed(2)
                default:
                    return 0
            }
        } else if (details.paper_level === 'Basic'){
            switch(details.academic_year === 'Undergraduate (years 1-2)'){
                case details.deadline === '4 Hours':
                    return (0.00).toFixed(2)
                case details.deadline === '8 Hours':
                    return (0.00).toFixed(2)
                case details.deadline === '24 Hours':
                    return (0.00).toFixed(2)
                case details.deadline === '2 Days':
                    return (0.00).toFixed(2)
                case details.deadline === '3 Days':
                    return (0.00).toFixed(2)
                case details.deadline === '5 Days':
                    return (0.00).toFixed(2)
                case details.deadline === '7 Days':
                    return (0.00).toFixed(2)
                case details.deadline === '14 Days':
                    return (0.00).toFixed(2)
                default:
                    return 0
            }
        } else if (details.paper_level === 'Advanced'){
            switch(details.academic_year === 'Undergraduate (years 1-2)'){
                case details.deadline === '4 Hours':
                    return (slides * 17.20/2).toFixed(2)
                case details.deadline === '8 Hours':
                    return (slides * 15.60/2).toFixed(2)
                case details.deadline === '24 Hours':
                    return (slides * 12.00/2).toFixed(2)
                case details.deadline === '2 Days':
                    return (slides * 10.40/2).toFixed(2)
                case details.deadline === '3 Days':
                    return (slides * 9.60/2).toFixed(2)
                case details.deadline === '5 Days':
                    return (slides * 7.60/2).toFixed(2)
                case details.deadline === '7 Days':
                    return (slides * 6.80/2).toFixed(2)
                case details.deadline === '14 Days':
                    return (slides * 6.00/2).toFixed(2)
                default:
                    return 0
            }
        }
        if (details.paper_level === 'Standard'){
            switch(details.academic_year === 'Undergraduate (years 3-4)'){
                case details.deadline === '4 Hours':
                    return (slides * 12.75/2).toFixed(2)
                case details.deadline === '8 Hours':
                    return (slides * 10.25/2).toFixed(2)
                case details.deadline === '24 Hours':
                    return (slides * 8.00/2).toFixed(2)
                case details.deadline === '2 Days':
                    return (slides * 7.50/2).toFixed(2)
                case details.deadline === '3 Days':
                    return (slides * 7.00/2).toFixed(2)
                case details.deadline === '5 Days':
                    return (slides * 5.75/2).toFixed(2)
                case details.deadline === '7 Days':
                    return (slides * 5.25/2).toFixed(2)
                case details.deadline === '14 Days':
                    return (slides * 5.00/2).toFixed(2)
                default:
                    return 0
            }
        } else if (details.paper_level === 'Basic'){
            switch(details.academic_year === 'Undergarduate (years 3-4)'){
                case details.deadline === '4 Hours':
                    return (0.00).toFixed(2)
                case details.deadline === '8 Hours':
                    return (0.00).toFixed(2)
                case details.deadline === '24 Hours':
                    return (0.00).toFixed(2)
                case details.deadline === '2 Days':
                    return (0.00).toFixed(2)
                case details.deadline === '3 Days':
                    return (0.00).toFixed(2)
                case details.deadline === '5 Days':
                    return (0.00).toFixed(2)
                case details.deadline === '7 Days':
                    return (0.00).toFixed(2)
                case details.deadline === '14 Days':
                    return (0.00).toFixed(2)
                default:
                    return 0
            }
        }else if (details.paper_level === 'Advanced'){
            switch(details.academic_year === 'Undergraduate (years 3-4)'){
                case details.deadline === '4 Hours':
                    return (slides * 20.40/2).toFixed(2)
                case details.deadline === '8 Hours':
                    return (slides * 16.40/2).toFixed(2)
                case details.deadline === '24 Hours':
                    return (slides * 12.80/2).toFixed(2)
                case details.deadline === '2 Days':
                    return (slides * 12.00/2).toFixed(2)
                case details.deadline === '3 Days':
                    return (slides * 11.20/2).toFixed(2)
                case details.deadline === '5 Days':
                    return (slides * 9.20/2).toFixed(2)
                case details.deadline === '7 Days':
                    return (slides * 8.40/2).toFixed(2)
                case details.deadline === '14 Days':
                    return (slides * 8.00/2).toFixed(2)
                default:
                    return 0
            }
        }
        if (details.paper_level === 'Standard'){
            switch(details.academic_year === 'Graduate'){
                case details.deadline === '4 Hours':
                    return (slides * 15.25/2).toFixed(2)
                case details.deadline === '8 Hours':
                    return (slides * 12.00/2).toFixed(2)
                case details.deadline === '24 Hours':
                    return (slides * 9.75/2).toFixed(2)
                case details.deadline === '2 Days':
                    return (slides * 9.00/2).toFixed(2)
                case details.deadline === '3 Days':
                    return (slides * 8.25/2).toFixed(2)
                case details.deadline === '5 Days':
                    return (slides * 7.25/2).toFixed(2)
                case details.deadline === '7 Days':
                    return (slides * 6.75/2).toFixed(2)
                case details.deadline === '14 Days':
                    return (slides * 6.25/2).toFixed(2)
                default:
                    return 0
            }
        } else if (details.paper_level === 'Basic'){
            switch(details.academic_year === 'Graduate'){
                case details.deadline === '4 Hours':
                    return (0.00).toFixed(2)
                case details.deadline === '8 Hours':
                    return (0.00).toFixed(2)
                case details.deadline === '24 Hours':
                    return (0.00).toFixed(2)
                case details.deadline === '2 Days':
                    return (0.00).toFixed(2)
                case details.deadline === '3 Days':
                    return (0.00).toFixed(2)
                case details.deadline === '5 Days':
                    return (0.00).toFixed(2)
                case details.deadline === '7 Days':
                    return (0.00).toFixed(2)
                case details.deadline === '14 Days':
                    return (0.00).toFixed(2)
                default:
                    return 0
            }
        }else if (details.paper_level === 'Advanced'){
            switch(details.academic_year === 'Graduate'){
                case details.deadline === '4 Hours':
                    return (slides * 24.40/2).toFixed(2)
                case details.deadline === '8 Hours':
                    return (slides * 19.20/2).toFixed(2)
                case details.deadline === '24 Hours':
                    return (slides * 15.60/2).toFixed(2)
                case details.deadline === '2 Days':
                    return (slides * 14.40/2).toFixed(2)
                case details.deadline === '3 Days':
                    return (slides * 13.20/2).toFixed(2)
                case details.deadline === '5 Days':
                    return (slides * 11.60/2).toFixed(2)
                case details.deadline === '7 Days':
                    return (slides * 10.80/2).toFixed(2)
                case details.deadline === '14 Days':
                    return (slides * 10.00/2).toFixed(2)
                default:
                    return 0
            }
        }
        if (details.paper_level === 'Standard'){
            switch(details.academic_year === 'PhD'){
                case details.deadline === '4 Hours':
                    return (slides * 18.25/2).toFixed(2)
                case details.deadline === '8 Hours':
                    return (slides * 14.50/2).toFixed(2)
                case details.deadline === '24 Hours':
                    return (slides * 12.50/2).toFixed(2)
                case details.deadline === '2 Days':
                    return (slides * 11.25/2).toFixed(2)
                case details.deadline === '3 Days':
                    return (slides   * 9.25/2).toFixed(2)
                case details.deadline === '5 Days':
                    return (slides * 8.75/2).toFixed(2)
                case details.deadline === '7 Days':
                    return (slides * 7.75/2).toFixed(2)
                case details.deadline === '14 Days':
                    return (slides * 7.25/2).toFixed(2)
                default:
                    return 0
            }
        } else if (details.paper_level === 'Basic'){
            switch(details.academic_year === 'PhD'){
                case details.deadline === '4 Hours':
                    return (0.00).toFixed(2)
                case details.deadline === '8 Hours':
                    return (0.00).toFixed(2)
                case details.deadline === '24 Hours':
                    return (0.00).toFixed(2)
                case details.deadline === '2 Days':
                    return (0.00).toFixed(2)
                case details.deadline === '3 Days':
                    return (0.00).toFixed(2)
                case details.deadline === '5 Days':
                    return (0.00).toFixed(2)
                case details.deadline === '7 Days':
                    return (0.00).toFixed(2)
                case details.deadline === '14 Days':
                    return (0.00).toFixed(2)
                default:
                    return 0
            }
        } else if (details.paper_level === 'Advanced'){
            switch(details.academic_year === 'PhD'){
                case details.deadline === '4 Hours':
                    return (slides * 29.20/2).toFixed(2)
                case details.deadline === '8 Hours':
                    return (slides * 23.20/2).toFixed(2)
                case details.deadline === '24 Hours':
                    return (slides * 20.00/2).toFixed(2)
                case details.deadline === '2 Days':
                    return (slides * 18.00/2).toFixed(2)
                case details.deadline === '3 Days':
                    return (slides * 14.80/2).toFixed(2)
                case details.deadline === '5 Days':
                    return (slides * 14.00/2).toFixed(2)
                case details.deadline === '7 Days':
                    return (slides * 12.40/2).toFixed(2)
                case details.deadline === '14 Days':
                    return (slides * 11.60/2).toFixed(2)
                default:
                    return 0
            }
        }
    }

    function programmingPricing(){
        if (details.task_size === 'Extra small'){
            switch(details.task_size === 'Extra small'){
                case details.deadline === '24 Hours':
                    return (45).toFixed(2)
                case details.deadline === '2 Days':
                    return (39).toFixed(2)
                case details.deadline === '3 Days':
                    return (34.50).toFixed(2)
                case details.deadline === '5 Days':
                    return (31.50).toFixed(2)
                case details.deadline === '7 Days':
                    return (30).toFixed(2)
                case details.deadline === '14 Days':
                    return (28.50).toFixed(2)
                default:
                    return 0
            }
        }else if(details.task_size === 'Small'){
            switch(details.task_size === 'Small'){
                case details.deadline === '24 Hours':
                    return (97.5).toFixed(2)
                case details.deadline === '2 Days':
                    return (84.5).toFixed(2)
                case details.deadline === '3 Days':
                    return (74.75).toFixed(2)
                case details.deadline === '5 Days':
                    return (68.25).toFixed(2)
                case details.deadline === '7 Days':
                    return (65.00).toFixed(2)
                case details.deadline === '14 Days':
                    return (61.75).toFixed(2)
                default:
                    return 0
            }
        }else if (details.task_size === 'Medium'){
            switch(details.task_size === 'Medium'){
                case details.deadline === '24 Hours':
                    return (187.5).toFixed(2)
                case details.deadline === '2 Days':
                    return (162.5).toFixed(2)
                case details.deadline === '3 Days':
                    return (143.75).toFixed(2)
                case details.deadline === '5 Days':
                    return (131.25).toFixed(2)
                case details.deadline === '7 Days':
                    return (125.00).toFixed(2)
                case details.deadline === '14 Days':
                    return (118.75).toFixed(2)
                default:
                    return 0
            }
        }else if (details.task_size === 'Large'){
            switch(details.task_size === 'Large'){
                case details.deadline === '24 Hours':
                    return (360).toFixed(2)
                case details.deadline === '2 Days':
                    return (312).toFixed(2)
                case details.deadline === '3 Days':
                    return (276).toFixed(2)
                case details.deadline === '5 Days':
                    return (252).toFixed(2)
                case details.deadline === '7 Days':
                    return (240).toFixed(2)
                case details.deadline === '14 Days':
                    return (228).toFixed(2)
                default:
                    return 0
            }
        }
    }

    function calculationsPricing(){
        if (details.task_size === 'Extra small'){
            switch(details.task_size === 'Extra small'){
                case details.deadline === '24 Hours':
                    return (37.50).toFixed(2)
                case details.deadline === '2 Days':
                    return (32.50).toFixed(2)
                case details.deadline === '3 Days':
                    return (28.75).toFixed(2)
                case details.deadline === '5 Days':
                    return (26.25).toFixed(2)
                case details.deadline === '7 Days':
                    return (25.00).toFixed(2)
                case details.deadline === '14 Days':
                    return (23.75).toFixed(2)
                default:
                    return 0
            }
        }else if(details.task_size === 'Small'){
            switch(details.task_size === 'Small'){
                case details.deadline === '24 Hours':
                    return (82.5).toFixed(2)
                case details.deadline === '2 Days':
                    return (71.5).toFixed(2)
                case details.deadline === '3 Days':
                    return (63.25).toFixed(2)
                case details.deadline === '5 Days':
                    return (57.75).toFixed(2)
                case details.deadline === '7 Days':
                    return (55.00).toFixed(2)
                case details.deadline === '14 Days':
                    return (52.25).toFixed(2)
                default:
                    return 0
            }
        }else if (details.task_size === 'Medium'){
            switch(details.task_size === 'Medium'){
                case details.deadline === '24 Hours':
                    return (165).toFixed(2)
                case details.deadline === '2 Days':
                    return (143).toFixed(2)
                case details.deadline === '3 Days':
                    return (126.5).toFixed(2)
                case details.deadline === '5 Days':
                    return (115.5).toFixed(2)
                case details.deadline === '7 Days':
                    return (110).toFixed(2)
                case details.deadline === '14 Days':
                    return (104.5).toFixed(2)
                default:
                    return 0
            }
        }else if (details.task_size === 'Large'){
            switch(details.task_size === 'Large'){
                case details.deadline === '24 Hours':
                    return (300).toFixed(2)
                case details.deadline === '2 Days':
                    return (260).toFixed(2)
                case details.deadline === '3 Days':
                    return (230).toFixed(2)
                case details.deadline === '5 Days':
                    return (210).toFixed(2)
                case details.deadline === '7 Days':
                    return (200).toFixed(2)
                case details.deadline === '14 Days':
                    return (190).toFixed(2)
                default:
                    return 0
            }
        }
    }

    function totalpreferencePrice(){

        let pagepreference = pagepreferencePrice()
        let chartpreference = chartpreferencePrice()
        let slidepreference = slidepreferencePrice()

        if(pages && charts && slides){
            return (parseFloat(pagepreference) + parseFloat(chartpreference) + parseFloat(slidepreference)).toFixed(2)
        }else if (pages && charts){
            return (parseFloat(pagepreference) + parseFloat(chartpreference)).toFixed(2)
        } else if(pages && slides){
            return (parseFloat(pagepreference) + parseFloat(slidepreference)).toFixed(2)
        } else if(charts && slides){
            return (parseFloat(chartpreference) + parseFloat(slidepreference)).toFixed(2)
        } else if(pages){
            return pagepreference
        } else if(charts){
            return chartpreference
        } else if (slides){
            return slidepreference
        }
    }

    function totalPrice(){
        let pagePrice = pageSwitch()
        let chartPrice = chartSwitch()
        let slidePrice = slideSwitch()
        let totalpreference = totalpreferencePrice()
        let totalprog = programmingPricing()
        let totalcalc = calculationsPricing()
        
        let totalPrice;

        if (details.order_type === 'Academic Writing'){
            totalPrice = parseFloat(pagePrice) + parseFloat(chartPrice) + parseFloat(slidePrice) + parseFloat(totalpreference)
            return totalPrice.toFixed(2)
        }else if(details.order_type === 'Programming Assignment'){
            totalPrice = parseFloat(totalprog)
            return totalPrice.toFixed(2)
        }else if(details.order_type === 'Calculations Assignment'){
            totalPrice = parseFloat(totalcalc)
            return totalPrice.toFixed(2)
        }
    }

    let price = totalPrice()

    useEffect(() => {
        if (price > 0){
            setDetails(prevState => ({
                ...prevState, amount: price
            }))
        }
    }, [price]);

    const handleSubmit = (e) => {
        e.preventDefault()

        const uploadData = new FormData();
        if (details.instruction_file){
            uploadData.append('pages', details.pages)
            uploadData.append('charts', details.charts)
            uploadData.append('slides', details.slides)
            uploadData.append('paper_type', details.paper_type)
            uploadData.append('instruction_file', details.instruction_file, details.instruction_file.name);
            uploadData.append('subject', details.subject)
            uploadData.append('instructions', details.instructions)
            uploadData.append('paper_format', details.paper_format)
            uploadData.append('references', details.references)
            uploadData.append('order_type', details.order_type)
            uploadData.append('academic_year', details.academic_year)
            uploadData.append('title', details.title)
            uploadData.append('deadline', details.deadline)
            uploadData.append('paper_level', details.paper_level)
            uploadData.append('upgrade', details.upgrade)
            uploadData.append('task_size', details.task_size)
            uploadData.append('programming_category', details.programming_category)
            uploadData.append('prog_language', details.prog_language)
            uploadData.append('software', details.software)
            uploadData.append('discipline', details.discipline)
            uploadData.append('spacing', details.spacing)
            uploadData.append('amount', details.amount)
        }else{
            uploadData.append('pages', details.pages)
            uploadData.append('charts', details.charts)
            uploadData.append('slides', details.slides)
            uploadData.append('paper_type', details.paper_type)
            uploadData.append('subject', details.subject)
            uploadData.append('instructions', details.instructions)
            uploadData.append('paper_format', details.paper_format)
            uploadData.append('references', details.references)
            uploadData.append('order_type', details.order_type)
            uploadData.append('academic_year', details.academic_year)
            uploadData.append('title', details.title)
            uploadData.append('deadline', details.deadline)
            uploadData.append('paper_level', details.paper_level)
            uploadData.append('upgrade', details.upgrade)
            uploadData.append('task_size', details.task_size)
            uploadData.append('programming_category', details.programming_category)
            uploadData.append('prog_language', details.prog_language)
            uploadData.append('software', details.software)
            uploadData.append('discipline', details.discipline)
            uploadData.append('spacing', details.spacing)
            uploadData.append('amount', details.amount)
        }

        fetch('https://tothemoonexperts-api.herokuapp.com/orders/summary', {
            method: 'POST',
            headers: {  
                'Authorization': `Token ${localStorage.getItem('token')}`
            },
            body: uploadData
        }).then(
            data => data.json()
        ).then(
            res => setref(res.id)
        ).then(
            () => setRedirect(!redirect)
        ).catch(err => console.log(err))
    };

    const navigate = useNavigate();

    if (redirect) {
        return navigate(`/order/pay/${ref}`, {replace: true})
    }

    let errorStyle = {
        fontSize: '.9rem',
        color: '#D2122E',
    }

    const handleErrors = () => {

        let order_typeError = ''
        let paper_typeError = ''
        let academic_yearError = ''
        let deadlineError = ''
        let spacingError = ''
        let disciplineError = ''
        let chartsSlidesPagesError = ''

        if (orderType === 'Academic Writing') {
            if (details.order_type.length < 1){
                order_typeError = 'Select order type'
            }else if (details.order_type.length > 0){
                order_typeError = ''
            }
            if (details.paper_type.length < 1){
                paper_typeError = 'Select paper type'
            }else if (details.paper_type.length > 0){
                paper_typeError = ''
            }
            if (details.discipline.length < 1){
                disciplineError = 'Select discipline'
            }else if (details.discipline.length > 0){
                disciplineError = ''
            }
            if (details.academic_year.length < 1){
                academic_yearError = 'Select academic level'
            }else{
                academic_yearError = ''
            }
            if (details.deadline.length < 1){
                deadlineError = 'Select deadline for delivery'
            }else{
                deadlineError = ''
            }
            if (pages < 1 && charts < 1 && slides < 1){
                chartsSlidesPagesError = 'Cannot be zero'
            }
            if (details.spacing.length < 1){
                spacingError = 'Select spacing'
            }else{
                spacingError = ''
            }
            if (order_typeError || paper_typeError || deadlineError || spacingError || academic_yearError || disciplineError || chartsSlidesPagesError){

                setValidators({order_typeError, paper_typeError, deadlineError, spacingError, academic_yearError, disciplineError, chartsSlidesPagesError}) 
                setError(true)
                return false
            }
            setError(false)
            return true
        }

        return true
    };

    
    const validate = () => {
        const isValid = handleErrors()
        if(isValid){
            setCurStep('SecondStep')
        }else{
            setCurStep('FirstStep')
        }
    };

    let displayStep, orderbtn, prevbtn;

    if (curStep === 'FirstStep'){
        displayStep = (
            <div className="place-order-requirements-container">
                <h1>Create a New Order</h1>
                <div className="place-order-requirements">
                <form>
                    <div className="top">
                        <div className="assignment-type">
                            <h4>Assignment type:</h4>
                            <div className="col-sm-12 col-md-6 mt-3" style={{width: '390px'}}>
                                <Form.Group controlId="formGridState">
                                    <Form.Select defaultValue={details.order_type.length > 1 ? details.order_type : "Academic Writing"} className='select' onChange={(e) => {
                                        setOrderType(e.target.value)
                                        setDetails(prevState => ({
                                            ...prevState, order_type:e.target.value
                                        }))
                                    }}>
                                    <option value="Academic Writing">Academic Writing</option>
                                    <option value="Programming Assignment">Programming Assignment</option>
                                    <option value="Calculations Assignment">Calculations Assignment</option>
                                    </Form.Select>
                                </Form.Group>
                            </div>
                            <h5 style={errorStyle}>{validators.order_typeError}</h5>
                        </div>
                        <div className="assignment-type">
                            {orderType === 'Academic Writing' && 
                                <>
                                    <h4>Type of Paper:</h4>
                                    <div className="col-sm-12 col-md-6 mt-3" style={{width: '390px'}}>
                                        <Form.Group controlId="formGridState">
                                            <Form.Select defaultValue={details.paper_type.length > 1 ? details.paper_type : "Essay"} className='select' onChange={(e) => setDetails(prevState => ({
                                                ...prevState, paper_type: e.target.value
                                            }))}>
                                            <option value="Creative Writing">Creative Writing</option>
                                            <option value="Essay">Essay</option>
                                            <option value="Research Paper">Research Paper</option>
                                            <option value="Speech">Speech</option>
                                            <option value="Business Plan">Business Plan</option>
                                            </Form.Select>
                                        </Form.Group>
                                    </div>
                                    <h5 style={errorStyle}>{validators.paper_typeError}</h5>
                                </>
                            }
                            {orderType === 'Programming Assignment' &&
                                <>
                                    <h4>Programming Language:</h4>
                                    <div className="col-sm-12 col-md-6 mt-3" style={{width: '390px'}}>
                                        <Form.Group controlId="formGridState">
                                            <Form.Select defaultValue={details.prog_language.length > 1 ? details.prog_language : "Python"} className='select' onChange={(e) => setDetails(prevState => ({
                                                ...prevState, prog_language: e.target.value
                                            }))}>
                                            <option value="Python">Python</option>
                                            <option value="JavaScript">JavaScript</option>
                                            <option value="C">C</option>
                                            <option value="C++">C++</option>
                                            <option value="Java">Java</option>
                                            </Form.Select>
                                        </Form.Group>
                                    </div>
                                    <h5 style={errorStyle}>{validators.paper_typeError}</h5>
                                </>
                            }
                            {orderType === 'Calculations Assignment' &&
                                <>
                                    <h4>Subject:</h4>
                                    <div className="col-sm-12 col-md-6 mt-3" style={{width: '390px'}}>
                                        <Form.Group controlId="formGridState">
                                            <Form.Select defaultValue={details.subject.length > 1 ? details.subject : "Engineering"} className='select' onChange={(e) => setDetails(prevState => ({
                                                ...prevState, subject: e.target.value
                                            }))}>
                                            <option value="Engineering">Engineering</option>
                                            <option value="Aviation">Aviation</option>
                                            <option value="Mathematics">Mathematics</option>
                                            <option value="Chemistry">Chemistry</option>
                                            <option value="Statistics">Statistics</option>
                                            </Form.Select>
                                        </Form.Group>
                                    </div>
                                    <h5 style={errorStyle}>{validators.paper_typeError}</h5>
                                </>
                            }
                        </div>
                    </div>

                    <div className="mid">
                        <div className="assignment-details">
                            <h4>Assignment details:</h4>
                            {orderType === 'Academic Writing' &&
                                <div className="col-sm-12 col-md-6 mt-3" style={{width: '390px'}}>
                                    <Form.Group controlId="formGridState">
                                        <Form.Select defaultValue={details.discipline.length > 1 ? details.discipline : "Philosophy"} className='select' onChange={(e) => setDetails(prevState => ({
                                            ...prevState, discipline: e.target.value
                                        }))}>
                                        <option value="Economics">Economics</option>
                                        <option value="History">History</option>
                                        <option value="Classic English Literature">Classic English Literature</option>
                                        <option value="Philosophy">Philosophy</option>
                                        <option value="Music">Music</option>
                                        </Form.Select>
                                    </Form.Group>
                                </div>
                            }
                            {orderType === 'Programming Assignment' &&
                                <div className="col-sm-12 col-md-6 mt-3" style={{width: '390px'}}>
                                    <Form.Group controlId="formGridState">
                                        <Form.Select defaultValue={details.programming_category.length > 1 ? details.programming_category : "Software Development"} className='select' onChange={(e) => setDetails(prevState => ({
                                            ...prevState, programming_category: e.target.value
                                        }))}>
                                        <option value="Web Programming">Web Programming</option>
                                        <option value="Computer Science">Computer Science</option>
                                        <option value="Software Development">Software Development</option>
                                        <option value="Database Design">Database Design</option>
                                        <option value="App Development">App Development</option>
                                        </Form.Select>
                                    </Form.Group>
                                </div>
                            }
                            {orderType === 'Calculations Assignment' &&
                                <div className="col-sm-12 col-md-6 mt-3" style={{width: '390px'}}>
                                    <Form.Group controlId="formGridState">
                                        <Form.Select defaultValue={details.software.length > 1 ? details.software : "Microsoft Excel"} className='select' onChange={(e) => setDetails(prevState => ({
                                            ...prevState, software: e.target.value
                                        }))}>
                                        <option value="Microsoft Excel">Microsoft Excel</option>
                                        <option value="Microsoft Word">Microsoft Word</option>
                                        <option value="STATA">STATA</option>
                                        <option value="SPSS">SPSS</option>
                                        <option value="Other">Other</option>
                                        </Form.Select>
                                    </Form.Group>
                                </div>
                            }
                            <h5 style={errorStyle}>{validators.disciplineError}</h5>
                            {orderType === 'Academic Writing' &&
                                <div className="col-sm-12 col-md-6 mt-3" style={{width: '390px'}}>
                                    <Form.Group controlId="formGridState">
                                        <Form.Select defaultValue={details.academic_year.length > 1 ? details.academic_year : "High School"} className='select' onChange={handleChange}>
                                        <option value="High School">High School</option>
                                        <option value="Undergraduate (years 1-2)">Undergarduate (years 1-2)</option>
                                        <option value="Undergraduate (years 3-4)">Undergarduate (years 3-4)</option>
                                        <option value="Graduate">Graduate</option>
                                        <option value="PhD">PhD</option>
                                        </Form.Select>
                                    </Form.Group>
                                </div>
                            }
                            {orderType === 'Programming Assignment' &&
                                <div className="col-sm-12 col-md-6 mt-3" style={{width: '390px'}}>
                                    <Form.Group controlId="formGridState">
                                        <Form.Select defaultValue={details.task_size.length > 1 ? details.task_size : "Extra Small"} className='select' onChange={(e) => setDetails(prevState => ({
                                            ...prevState, task_size: e.target.value
                                        }))}>
                                        <option value="Extra small">Extra small</option>
                                        <option value="Small">Small</option>
                                        <option value="Medium">Medium</option>
                                        <option value="Large">Large</option>
                                        </Form.Select>
                                    </Form.Group>
                                </div>
                            }
                            {orderType === 'Calculations Assignment' &&
                                <div className="col-sm-12 col-md-6 mt-3" style={{width: '390px'}}>
                                    <Form.Group controlId="formGridState">
                                        <Form.Select defaultValue={details.task_size.length > 1 ? details.task_size : "Extra Small"} className='select' onChange={(e) => setDetails(prevState => ({
                                            ...prevState, task_size: e.target.value
                                        }))}>
                                        <option value="Extra small">Extra small</option>
                                        <option value="Small">Small</option>
                                        <option value="Medium">Medium</option>
                                        <option value="Large">Large</option>
                                        </Form.Select>
                                    </Form.Group>
                                </div>
                            }
                            <h5 style={errorStyle}>{validators.academic_yearError}</h5>
                        </div>
                        {orderType === 'Academic Writing' &&
                            <div className="deadline">
                                <h4>Deadline:</h4>
                                <div className="col-sm-12 col-md-6 mt-3" style={{width: '390px'}}>
                                    <Form.Group controlId="formGridState">
                                        <Form.Select defaultValue={details.deadline.length > 1 ? details.deadline : "4 Hours"} className='select' onChange={(e) => setDetails(prevState => ({
                                            ...prevState, deadline: e.target.value
                                        }))}>
                                        <option value="4 Hours">4 Hours</option>
                                        <option value="8 Hours">8 Hours</option>
                                        <option value="24 Hours">24 Hours</option>
                                        <option value="2 Days">2 Days</option>
                                        <option value="3 Days">3 Days</option>
                                        <option value="5 Days">5 Days</option>
                                        <option value="7 Days">7 Days</option>
                                        <option value="14 Days">14 Days</option>
                                        </Form.Select>
                                    </Form.Group>
                                </div>
                                <h5 style={errorStyle}>{validators.deadlineError}</h5>
                            </div>
                        }
                        {orderType === 'Programming Assignment' &&
                            <div className="deadline">
                                <h4>Deadline:</h4>
                                <div className="col-sm-12 col-md-6 mt-3" style={{width: '390px'}}>
                                    <Form.Group controlId="formGridState">
                                        <Form.Select defaultValue={details.deadline.length > 1 ? details.deadline : "24 Hours"} className='select' onChange={(e) => setDetails(prevState => ({
                                            ...prevState, deadline: e.target.value
                                        }))}>
                                        <option value="24 Hours">24 Hours</option>
                                        <option value="2 Days">2 Days</option>
                                        <option value="3 Days">3 Days</option>
                                        <option value="5 Days">5 Days</option>
                                        <option value="7 Days">7 Days</option>
                                        <option value="14 Days">14 Days</option>
                                        </Form.Select>
                                    </Form.Group>
                                </div>
                                <h5 style={errorStyle}>{validators.deadlineError}</h5>
                            </div>
                        }
                        {orderType === 'Calculations Assignment' &&
                            <div className="deadline">
                                <h4>Deadline:</h4>
                                <div className="col-sm-12 col-md-6 mt-3" style={{width: '390px'}}>
                                    <Form.Group controlId="formGridState">
                                        <Form.Select defaultValue={details.deadline.length > 1 ? details.deadline : "24 Hours"} className='select' onChange={(e) => setDetails(prevState => ({
                                            ...prevState, deadline: e.target.value
                                        }))}>
                                        <option value="24 Hours">24 Hours</option>
                                        <option value="2 Days">2 Days</option>
                                        <option value="3 Days">3 Days</option>
                                        <option value="5 Days">5 Days</option>
                                        <option value="7 Days">7 Days</option>
                                        <option value="14 Days">14 Days</option>
                                        </Form.Select>
                                    </Form.Group>
                                </div>
                                <h5 style={errorStyle}>{validators.deadlineError}</h5>
                            </div>
                        }
                    </div>

                    {orderType === 'Academic Writing' &&
                        <div className="bottom">
                        <div className="size">
                            <h4>Assignment size:</h4>
                            <div className="pages">
                                <div className="page-ref">
                                    <h4>Pages:</h4>
                                    <div className="ref">
                                        <button onClick={decrementPages} >-</button>
                                        <input type="text" value={pages}/>
                                        <button onClick={incrementPages}>+</button>
                                    </div>
                                    <h5 style={errorStyle}>{validators.chartsSlidesPagesError}</h5>
                                </div>
                                <div className="words">
                                    <h4>Words:</h4>
                                    <button>{no_words}</button>
                                </div>
                                <div className="line-spacing">
                                    <h4>Line spacing:</h4>
                                    <div className="col-sm-12 col-md-6 mt-3" style={{width: '160px'}}>
                                        <Form.Group controlId="formGridState">
                                            <Form.Select defaultValue={details.spacing.length > 1 ? details.spacing : "Double"} className='select' onChange={handleSpacing}>
                                            <option value="Double">Double</option>
                                            <option value="Single">Single</option>
                                            </Form.Select>
                                        </Form.Group>
                                    </div>
                                    <h5 style={errorStyle}>{validators.spacingError}</h5>
                                </div>
                            </div>
                        </div>

                        <div className="charts-slides">
                            <h4>Charts, Slides & References</h4>
                            <div className="chart-ref">
                                <div className="page-ref">
                                    <h4>Slides:</h4>
                                    <div className="ref">
                                        <button onClick={decrementSlides} >-</button>
                                        <input type="text" value={slides}/>
                                        <button onClick={incrementSlides}>+</button>
                                    </div>
                                    <h5 style={errorStyle}>{validators.chartsSlidesPagesError}</h5>
                                </div>
                                <div className="page-ref" style={{marginLeft: '20px'}}>
                                    <h4>Charts:</h4>
                                    <div className="ref">
                                        <button onClick={decrementCharts} >-</button>
                                        <input type="text" value={charts}/>
                                        <button onClick={incrementCharts}>+</button>
                                    </div>
                                    <h5 style={errorStyle}>{validators.chartsSlidesPagesError}</h5>
                                </div>
                                <div className="page-ref" style={{marginLeft: '20px'}}>
                                    <h4>References:</h4>
                                    <div className="ref">
                                        <button onClick={decrementReferences} >-</button>
                                        <input type="text" value={references}/>
                                        <button onClick={incrementReferences}>+</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    }

                </form>
                </div>
            </div>
        )

        orderbtn = (
            <div className="next-step">
                <button onClick={validate}>Next Step</button>
            </div>
        )
    }else if (curStep === 'SecondStep'){
        displayStep = (
            <div className="place-order-requirements-container">
                <h1>Create a New Order</h1>
                <Modal 
                    open={open}
                    onClose={() => setOpen(false)}
                >
                
                    <div className="summary-container">
                        <div className="top">
                            <h2>Summary details</h2>
                            <ul>
                                <li style={writingStyle}>{details.paper_type}</li>
                                <li style={categoryStyle}>{details.programming_category}</li>
                                <li style={softwareStyle}>{details.subject}</li>
                                <li style={writingStyle}>{details.discipline}</li>
                                <li style={categoryStyle}>{details.prog_language}</li>
                                <li style={softwareStyle}>{details.software}</li>
                            </ul>
                            <ol>
                                <li>{details.order_type}</li>
                                <li>${price}</li>
                            </ol>
                            <h4 style={pageStyle}>{pages} pages x ${spacing_value} <span>${pageSwitch()}</span></h4>
                            <h4 style={slideStyle}>{slides} slides x $19.50 <span>${slideSwitch()}</span></h4>
                            <h4 style={chartStyle}>{charts} charts x $19.50 <span>${chartSwitch()}</span></h4>
                            <h4 style={paperLevelStyle}>Writer's preference <span>${totalpreferencePrice()}</span></h4>
                            <ol>
                                <li>Total Price</li>
                                <li>${price}</li>
                            </ol>
                            <button onClick={handleSubmit}>Proceed to Checkout</button>
                        </div>
                    </div>

                </Modal>

                <div className="order-details-container">
                {orderType === 'Academic Writing' &&
                    <div className="top">
                        <div className="title">
                            <h4>Title:</h4>
                            <form>
                                <input type='text' 
                                    placeholder="Enter title of your paper"
                                    value={details.title}
                                    onChange={(e) => setDetails(prevState => ({
                                        ...prevState, title: e.target.value
                                    }))}
                                />
                            </form>
                        </div>
                        <div className="format">
                            <h4>Paper format:</h4>
                            <div className="col-sm-12 col-md-6 mt-3" style={{width: '250px'}}>
                                <Form.Group controlId="formGridState">
                                    <Form.Select defaultValue="MLA" className='select' onChange={(e) => setDetails(prevState => ({
                                        ...prevState, paper_format: e.target.value
                                    }))}>
                                    <option value="MLA">MLA</option>
                                    <option value="APA 6">APA 6</option>
                                    <option value="APA 7">APA 7</option>
                                    <option value="Chicago / Turabian">Chicago / Turabian</option>
                                    <option value="Not applicable">Not applicable</option>
                                    </Form.Select>
                                </Form.Group>
                            </div>
                        </div>
                    </div>
                }

                    <div className="mid">
                        <h4>Paper details:</h4>
                        <form>
                            <textarea
                                placeholder="Write anything that you feel is important for the writer to consider"
                                value={details.instructions}
                                onChange={(e) => setDetails(prevState => ({
                                    ...prevState, instructions: e.target.value
                                }))}
                            ></textarea>
                        </form>
                    </div>

                    <div className="bottom">
                        <div className="files" style={{width: orderType === 'Academic Writing' ? '30%' : '100%'}}>
                            <h4>Additional materials:</h4>
                            <div className='upload'>
                                <form>
                                    <input type='file'   
                                        onChange={(e) => {
                                            if (e.target.files) {
                                                setDetails(prevState => ({
                                                ...prevState, instruction_file: e.target.files[0]
                                                }));
                                            } else {
                                                setDetails(prevState => ({
                                                ...prevState, instruction_file: e.target.value
                                                }));
                                            }
                                        }}
                                    />
                                </form>
                            </div>
                        </div>

                        {orderType === 'Academic Writing' &&
                            <form>
                                <h4>Writers preferences</h4>
                                <div className='level12'>
                                    <div className={details.paper_level === 'Basic' ? "input1 selected" : "input1"}>
                                        <input 
                                            type='radio'
                                            value='Basic'
                                            id='basic'
                                            checked={details.academic_year === 'Basic'}
                                            onChange={(e) => setDetails(details => ({
                                                ...details, paper_level: e.target.value
                                            }))}
                                        />
                                        <label for='basic' >Basic</label>
                                        
                                    </div>
                                    <div className={details.paper_level === 'Standard' ? "input1 selected" : "input1"}>
                                        <input 
                                            type='radio'
                                            value='Standard'
                                            id='standard'
                                            checked={details.academic_year === 'Standard'}
                                            onChange={(e) => setDetails(details => ({
                                                ...details, paper_level: e.target.value
                                            }))}
                                        />
                                        <label for='standard'>Standard</label>
                                        
                                    </div>
                                    <div className={details.paper_level === 'Advanced' ? "input1 selected" : "input1"}>
                                        <input 
                                            type='radio'
                                            value='Advanced'
                                            id='advanced'
                                            checked={details.academic_year === 'Advanced'}
                                            onChange={(e) => setDetails(details => ({
                                                ...details, paper_level: e.target.value
                                            }))}
                                        />
                                        <label for='advanced'>Expert</label>
                                    
                                    </div>
                                </div>
                            </form>
                        }
                    </div>
                </div>
            </div>
        )

        orderbtn = (
            <div className="next-step">
                <button onClick={() => setOpen(!open)}>Summary</button>
            </div>
        )

        prevbtn = (
            <div className="prev-step">
                    <button onClick={() => setCurStep('FirstStep')}>Prev Step</button>
            </div>
        )
    }

    return (
        <div className="make-container">
        <div className="placeorder-container">

            <div className="placeorder-sidebar">
                <div className="order-requirements">
                    <h2>1</h2>
                    <ul>
                        <li>
                            <h3 style={{color: error ? '#D2122E' : '#fff'}}>Order requirements</h3>
                            <p style={{color: error ? '#D2122E' : '#fff'}}>Add your order requirements.</p>
                        </li>
                    </ul>
                </div>
                <div className="order-requirements">
                    <h2>2</h2>
                    <ul>
                        <li>
                            <h3>Order details</h3>
                            <p>Add your order details.</p>
                        </li>
                    </ul>
                </div>
            </div>

            {displayStep}


        </div>
            <div className="summarybtn">
                <div className="prev-step">
                    {prevbtn}
                </div>

                <div className="next-step">
                    {orderbtn}
                </div>
            </div>
        </div>
    )
}