import React, { Component } from 'react';
import ReactTable from "react-table";
import REACTDOM from "react-dom";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import './DefaultReactTable.css';
import axios from 'axios';

export class FetchData extends Component {
    static displayName = FetchData.name;
    
    constructor(props) {
        super(props);
        this.state = {
            data: {
                value1: "",
                value2: "",
                value3: ""
            },
            forecasts: [], loading: true, modal: false, clicked: false, update: '',teamId:'',Button:'Delete',
            fade: false, teamValue: '', descriptionValue: '',memberValue:'', value2: '', message: '', visible: false
        };

        this.toggle = this.toggle.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        //this.handleEdit = this.handleEdit.bind(this);
        //this.remove = this.handleEdit(this).bind(this);
        //this.toggleColumn = this.toggleColumn.bind(this);
    }
    toggle(e) {
        console.log("hello");
        this.setState({ teamValue: '', descriptionValue: '', memberValue:'' });

        this.setState({
            modal: !this.state.modal,
            update: false
        });
       
        console.log('after setState: ', this.state);
    }

  



    handleSubmit(event) {

        if (this.state.update == false)
        {
            var teamName = document.getElementById('txtTeamName').value;
            var description = document.getElementById('txtDescription').value;
            var teamMembers = document.getElementById('txtTeamMembers').value;


            let team = {
                TeamId: 18,
                TeamName: teamName,
                Description: description,
                TeamMembers: teamMembers
            };
            fetch('/api/Team', {
                /* fetch('/Team', {*/
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-type': 'application/json'
                },
                //body: JSON.stringify({
                //    TeamId: 8,
                //    TeamName: 'test',
                //    Description: 'test',
                //    TeamMembers: 'test' })
                body: JSON.stringify(
                    team
                )

            }).then(r => r.json()).then(res => {
                if (res) {
                    this.setState({ message: 'New Employee is Created Successfully' });
                }
            });
        }
        if (this.state.update == true)
        {
            let team =
            {
                TeamId: this.state.teamId,
                TeamName: document.getElementById('txtTeamName').value,
                Description: document.getElementById('txtDescription').value,
                TeamMembers: document.getElementById('txtTeamMembers').value
            };
            fetch('/api/Team/Update', {
                /* fetch('/Team', {*/
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-type': 'application/json'
                },
                //body: JSON.stringify({
                //    TeamId: 8,
                //    TeamName: 'test',
                //    Description: 'test',
                //    TeamMembers: 'test' })
                body: JSON.stringify(
                    team
                )

            }).then(r => r.json()).then(res => {
                if (res) {
                    this.setState({ message: 'New Employee is Created Successfully' });
                    //window.location("api/Team");
                }
            });
        }
       

      

    }


    static renderPopupForm() {

        return (
            <div >
                <label for="form7" class="pb-2">Team Name</label><br></br>
                <textarea id="txtTeamName" name="name" placeholder="Please Enter Team Name" rows="2" cols="60" />
                <label for="form7" class="pb-2">Description</label><br></br>
                <textarea id="txtDescription" placeholder="Please Enter Description" name="name2" rows="2" cols="60" />
                <label for="form7" class="pb-2">Team Members</label><br></br>
                <textarea id="txtTeamMembers" name="name2" placeholder="Please Enter Team Members" rows="2" cols="60" />
            </div>
        );
    }


    componentDidMount() {
        this.populateWeatherData();
      

    }
    static testing(e) {

      

    }
    onRowClick = (state, rowInfo, column, instance) => {
        return {
            
            onClick: e => {
                const btnId = e.target.dataset.id;
                this.setState({ teamId: rowInfo.row.teamId, teamValue: rowInfo.row.teamName, descriptionValue: rowInfo.row.description, memberValue: rowInfo.row.teamMembers });
                if (btnId == "editButtonId") {
                    this.setState({
                        modal: !this.state.modal,
                        update: true
                    });
                   /* this.setState({ teamId: rowInfo.row.teamId, teamValue: rowInfo.row.teamName, descriptionValue: rowInfo.row.description, memberValue: rowInfo.row.teamMembers });*/
                }
                else if (btnId == "deleteButtonId") {

                    let team =
                    {
                        TeamId: rowInfo.row.teamId,
                        TeamName: rowInfo.row.teamName,
                        Description: rowInfo.row.description,
                        TeamMembers: rowInfo.row.teamMembers
                    };

                    fetch('/api/Team/Delete', {
                        method: 'POST',
                        headers: {
                            'Accept': 'application/json',
                            'Content-type': 'application/json'
                        },
                        body: JSON.stringify(
                            team
                        )

                    }).then(r => r.json()).then(res => {
                        if (res) {
                            this.setState({ message: 'Deleted' });
                        }
                    });

                }               
                //if (

                //    e.target.type == "submit"

                //) {
                //    alert(rowInfo.original.name)
                //}              
            }
        }
    }

    static renderForecastsTable(forecasts) {

        //let popupForm1 = FetchData.renderPopupForm();
        //let contents = this.state.clicked
        //    ? <p><em>Loading...</em></p>
        //    : FetchData.renderForecastsTable(this.state.forecasts);
        
        return (
           
            <div>

                <ReactTable
                    getTdProps={this.onRowClick}
                    expandedRows={true}
                data={forecasts}
                columns={[
                    {
                        columns: [
                            {
                                // Header: () => <p id="testing">Dealer ID</p>,
                                Header: () => <strong>Team Id</strong>,
                                accessor: 'teamId',
                            },
                            {
                                Header: () => <strong>Team Name</strong>,
                                accessor: 'teamName',
                            },
                            {
                                Header: () => <strong>Description</strong>,
                                accessor: 'description',
                            },

                            {
                                //accessor: '[editButton]',
                                // Cell: (cellObj) => <button onClick={() => handleClickEditRow(cellObj.row)}>Edit</button>
                                Header: "Button",
                                accessor: "Button",
                                Cell: ({ row }) => (
                                    <button>
                                        Detailed View
                                    </button>
                                )

                               
                              
                             
                            }

                        ],
                    },

                ]}
                defaultPageSize={5}
               
                />
           
                </div>

           
        );
      

    }

    render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : FetchData.renderForecastsTable(this.state.forecasts);
       
        let popupForm = FetchData.renderPopupForm();


        return (
            <div><br></br>
                <h2 id="tabelLabel" >Manage Team</h2><br></br>

                <div>
                    <Button color='success' onClick={this.toggle}>Add Team</Button>
                    <Modal isOpen={this.state.modal} fade={this.state.fade} toggle={this.toggle}>
                        <ModalHeader style={{ background: 'Highlight', color: 'white' }} toggle={this.toggle} >
                            <div >Team Details</div>
                        </ModalHeader>
                        <form onSubmit={this.handleSubmit}>
                            <ModalBody>
                                <div >
                                    <label for="form7" class="pb-2">Team Name</label><br></br>
                                    <textarea required id="txtTeamName" defaultValue={this.state.teamValue} name="name" placeholder="Please Enter Team Name" rows="2" cols="60" />
                                    <label for="form7" class="pb-2">Description</label><br></br>
                                    <textarea required id="txtDescription" defaultValue={this.state.descriptionValue} placeholder="Please Enter Description" name="name2" rows="2" cols="60" />
                                    <label for="form7" class="pb-2">Team Members</label><br></br>
                                    <textarea required id="txtTeamMembers" defaultValue={this.state.memberValue} name="name2" placeholder="Please Enter Team Members" rows="2" cols="60" />
                                </div>

                            </ModalBody>
                            <ModalFooter >
                                {/*<Button onClick={this.toggle}>OK</Button>{' '}*/}
                                {/*<input type="submit" value="Submit" />*/}
                                <Button type="submit" value="Submit">OK</Button>
                                <Button onClick={this.toggle}>Cancel</Button>
                            </ModalFooter>
                        </form>
                    </Modal>

                </div><br></br>


                <br></br>
                {/* {contents}*/}

                <div>

                    <ReactTable
                        getTdProps={this.onRowClick}
                        expandedRows={true}
                        data={this.state.forecasts}
                        columns={[
                            {
                                columns: [
                                    {
                                        // Header: () => <p id="testing">Dealer ID</p>,
                                        Header: () => <strong>Team Id</strong>,
                                        accessor: 'teamId',
                                    },
                                    {
                                        Header: () => <strong>Team Name</strong>,
                                        accessor: 'teamName',
                                    },
                                    {
                                        Header: () => <strong>Description</strong>,
                                        accessor: 'description',
                                    },
                                    {
                                        Header: () => <strong>Team  Members</strong>,
                                        accessor: 'teamMembers',
                                    },

                                    {
                                        //accessor: '[editButton]',
                                        // Cell: (cellObj) => <button onClick={() => handleClickEditRow(cellObj.row)}>Edit</button>
                                        Header: "Action",
                                        accessor: "Button",
                                        Cell: ({ row }) => (
                                            <div>
                                                <button data-id="editButtonId">
                                                    Edit
                                                </button> {' '}
                                                <button data-id="deleteButtonId">
                                                   Delete
                                                </button>                                               
                                            </div>                                                                                     
                                        )

                                    }

                                ],
                            },

                        ]}
                        defaultPageSize={5}

                    />

                </div>




            </div>



        );
    }

    async populateWeatherData() {
        const response = await fetch('api/Team');
        const data = await response.json();
        this.setState({ forecasts: data, loading: false });
    }

   

}
