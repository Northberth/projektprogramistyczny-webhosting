import { Field, Form, Formik } from "formik";
import { useState } from "react";
import { Link } from "react-router-dom";
import '../App.css';
const Home = () => {
    let categories: { name: string, description: string, language: string }[] = [
        { 'name': 'animals', 'description': 'Zwierzęta', 'language': 'PL' },
        { 'name': 'food', 'description': 'Jedzenie', 'language':'PL' },
        { 'name': 'informatics', 'description': 'Informatyka' , 'language': 'PL' },
        { 'name': 'sport_en', 'description': 'Sports (EN)', 'language': 'EN' }];    
    const [userName, setUserName] = useState('');
    const [isActiveUser, setIsActiveUser] = useState(true);

    function HandleSubmit(values: any) {
        let user = values.user;
        setUserName(user);
        setIsActiveUser(false);
    };
    return (
        <>

            <div>
                <h1>Wisielec (Hanged Man)</h1>
                <Formik initialValues={{
                    user: ''
                }}
                    onSubmit={async (values) => {
                        await new Promise((r) => setTimeout(r, 500));
                        HandleSubmit(values);
                    }}>
                    <Form>
                        <label htmlFor="user">Gracz (Player)</label>
                        <Field id="user" name="user" placeholder="Name" />
                        <button type="submit" className="btn btn-success">Submit</button>
                    </Form>
                </Formik>
                {userName}
                <h2>Wybierz kategorię (Choose category)</h2>
                {
                    categories.map((cat) => {
                        return (
                            <li key={cat.name}>
                                <Link to='/game' state={[cat,userName]}>
                                    <button disabled={isActiveUser}>
                                        {cat.description}
                                    </button>
                                </Link>
                            </li>
                        )
                    })
                }
            </div>
        </>
    );
}
export default Home;