import React, {Component} from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle, Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { Link } from 'react-router-dom';
import {Button, Modal, ModalHeader, ModalBody, Label, Row, Col} from 'reactstrap';
import {Control, LocalForm, Errors} from 'react-redux-form';


class CommentForm extends Component
{
    constructor(props)
    {
        super(props)
        this.state={
            modal: false
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.toggleModal = this.toggleModal.bind(this);
    }

    toggleModal(event)
    {
        this.setState({
            modal: !this.state.modal
        })
    }

    handleSubmit(values){
        if(!values.rating)
        {
            this.props.addComment(this.props.dishId, 1, values.author, values.comment)
            alert("Hello");
        }
        else
        {
            this.props.addComment(this.props.dishId, values.rating, values.author, values.comment)
            alert("Hii");
        }
    }
    render(){

        const minLength = (len) => (val) => (val) && (val.length>=len)
        const maxLength = (len) => (val) => !(val) || (val.length<=len)
        return(
            <div>
                <Button outline onClick = {this.toggleModal}><span className="fa fa-pencil fa-lg"></span> Submit Comment</Button>
                <Modal isOpen={this.state.modal} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
                    <ModalBody>
                        <div className="container">
                        <LocalForm onSubmit = {(values) => this.handleSubmit(values)}>
                            <Row className="form-group">
                                <Label htmlFor="rating">Rating</Label>
                                    <Control.select model=".rating" id="rating" name="rating" className="form-control">
                                        <option>1</option>
                                        <option>2</option>
                                        <option>3</option>
                                        <option>4</option>
                                        <option>5</option>
                                    </Control.select>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="author">Your Name</Label>
                                <Control.text model=".author" id="author" name="author" className="form-control" placeholder="Your Name" validators={{minLength: minLength(3), maxLength: maxLength(15)}} />
                                <Errors className="text-danger" model=".author" show="touched" messages={{minLength: "Must be greater than 2 characters", maxLength: "Must be 15 characters or less"}}></Errors>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="comment">Comment</Label>
                                <Control.textarea model=".comment" id="comment" name="comment" className="form-control" rows="6" />
                            </Row>
                            <Row>
                            <Button type="submit" value="submit" color="primary">Submit</Button>
                            </Row>
                        </LocalForm>
                        </div>
                    </ModalBody>
                </Modal>
            </div>
        );
    }
}

    function RenderDish({dish}) {
        if(dish!=null)
        {
            return(
                
                <Card>
                    <CardImg top src={dish.image} alt={dish.name} />
                    <CardBody>
                        <CardTitle>{dish.name}</CardTitle>
                        <CardText>{dish.description}</CardText>
                    </CardBody>
                </Card>

            );
        }
        else
        {
            return(
                <div></div>
            );
        }
    }
    function RenderComments({comments, addComment, dishId})
    {
        if(comments!=null)
        {
            const Comment = comments.map((comment) => {
                return(
                    <div>
                        <li style={{listStyleType: 'none'}}>{comment.comment}</li>
                        <br />
                        <li style={{listStyleType: 'none'}}>-- {comment.author} , {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comment.date)))}</li>
                        <br />
                    </div>
                )
            });
            return(
                <div>
                    <h4>Comments</h4>
                    {Comment}
                    <CommentForm dishId={dishId} addComment={addComment}/>
                </div>
            );
        }
        else
        {
            return(
                <div></div>
            );
        }
    }
    function DishDetail(props)
    {
        return (
            <div className="container">
            <div className="row">
                <Breadcrumb>

                    <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                    <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                </Breadcrumb>
                <div className="col-12">
                    <h3>{props.dish.name}</h3>
                    <hr />
                </div>                
            </div>
            <div className="row">
                <div className="col-12 col-md-5 m-1">
                    <RenderDish dish={props.dish} />
                </div>
                <div className="col-12 col-md-5 m-1">
                    <RenderComments comments={props.comments} 
                    addComment = {props.addComment}
                    dishId = {props.dish.id}  />
                </div>
            </div>
            </div>
        );
    }

export default DishDetail;