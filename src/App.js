import logo from './logo.svg';
import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'
import './App.css';
import { DatePicker, Button } from 'antd';
import {useEffect, useState} from 'react'

function App() {

    const [categories, setCategories] = useState();
    const [selectedCategory, setSelectedCategory] = useState();
    const [questions, setQuestions] = useState();

    const [questionTxt, setQuestionTxt] = useState('');


    const fetchCategories = async () => {
        let res = await fetch('http://localhost:3000/api/v1/categories')
        let json = await res.json()
        console.log(json)
        setCategories(json)
    };

    useEffect(() => {
        console.log('run this only once when the page loads up')
        fetchCategories()
    }, [])

    const fetchQuestions = async (category) => {
        // console.log(category)
        // write code here to make a fetch call to get ALL the questions where cateogry id = category.id
        // once fetched, write code to display it on the UI
        let res = await fetch(`http://localhost:3000/api/v1/categories/${category.id}/questions`)
        let data = await res.json()
        console.log(data)
        setQuestions(data)
    };

    const switchCategory = async (category) => {
        console.log('the selcted category is', category)
        setSelectedCategory(category)
        // write code here to fetch the questions for the selected category
        fetchQuestions(category)

    };

    const createQuestion = async () => {
        console.log('questionTxt', questionTxt)
        console.log('selectedCategory', selectedCategory)
        let res = await fetch(`http://localhost:3000/api/v1/categories/${selectedCategory.id}/questions`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({questionTxt: questionTxt})
        })
        let data = await res.json()
        console.log(data)

    };

  return (
    <>

        <div className={'flex justify-center p-6 border-b-4 border-gray-300'}>
            <h1 className={'text-4xl uppercase font-bold tracking-wider'}>Capstone App</h1>

        </div>

        <div className={'grid grid-cols-12'}>
            <div className={'col-span-12 md:col-span-2'}>
                {/*<h1>Category Listing</h1>*/}

                <ul className={'border'}>
                    {categories && categories.map((category) => {
                        return <li key={category.id}
                                   onClick={() => switchCategory(category)}
                                   className={(selectedCategory && (selectedCategory.id == category.id)) ?  'p-14 border-b text-3xl bg-gray-200' : 'p-14 border-b text-3xl'}>{category.name}</li>
                    })}
                </ul>

                {/*<DatePicker />*/}
                {/*<Button type="danger" ghost>Primary Button</Button>*/}


            </div>

            <div className={'col-span-12 border md:col-span-10 h-96 bg-gray-300'}>

                {selectedCategory && <div className={'w-1/3 p-2'}>
                    <textarea value={questionTxt}
                              onChange={(ev) => setQuestionTxt(ev.currentTarget.value)}
                              type="text"
                              className={'border p-1 w-full'}
                              placeholder={'Enter the question text...'}/>

                    <button className={'px-4 py-3 bg-blue-500 text-white rounded'} onClick={createQuestion}>Create Question</button>
                </div>}


                <h1>Question/Answer Listing</h1>

                <hr/>

                <ul>
                    {questions && questions.map((question) => {
                        return <li key={question.id}>
                            {question.questionTxt}
                        </li>

                    })}
                </ul>


            </div>

        </div>



    </>
  );
}

export default App;
