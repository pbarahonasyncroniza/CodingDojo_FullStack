import { Col, Row} from "react-bootstrap"
import React, {useState, useEffect} from "react"
import axios from "axios"
import BackLog from "../components/backLog";
import Inprogress from "../components/Inprogress";
import Completed from "../components/Completed";



        const HomeView = (props) =>{

            const [tasks, setTasks] = useState([]);
            const [triggerUpdate, setTriggerUpdate] = useState(false); // <-- Añadir esto

            useEffect(() => {
                const fetchTasks = async () => {
                    try {
                        const response = await axios.get("http://localhost:8000/tasks");
                        if (response.data && Array.isArray(response.data.data)) {
                            
                            const formattedAndSortedTasks = response.data.data.map(task => ({
                                ...task,
                                due_date: task.due_date.split("T")[0]
                            })).sort((a, b) => {
                                const dateA = new Date(a.due_date);
                                const dateB = new Date(b.due_date);
                                return dateA - dateB; 
                            });
                
                            setTasks(formattedAndSortedTasks);
                            console.log("Tasks fetched, formatted and sorted from API:", formattedAndSortedTasks);
                        }
                    } catch (error) {
                        console.error("Error fetching tasks:", error);
                    }
                };
                fetchTasks();
            }, [triggerUpdate]);



        return (

            <Row className="bg-light ms-3 me-3 mt-3 mb-3 border border-dark">
                <h1>Project Manager</h1>
                <Col md={4} className="mb-3 ">
                <BackLog tasks={tasks.filter(task => task.status === 'backlog')} setTasks={setTasks} triggerUpdate={() => setTriggerUpdate(!triggerUpdate)} />
                </Col >
                <Col md={4} className="mb-3 ">
                <Inprogress tasks={tasks.filter(task => task.status === 'inprogress')} setTasks={setTasks} triggerUpdate={() => setTriggerUpdate(!triggerUpdate)} />
                </Col>
                <Col md={4} className="mb-3 ">
                <Completed tasks={tasks.filter(task => task.status === 'completed')} setTasks={setTasks} triggerUpdate={() => setTriggerUpdate(!triggerUpdate)} />
                </Col>
            </Row>
                


        )

        }
export default HomeView;
