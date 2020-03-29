import React, {Component} from 'react';
import { Card, CardImg, CardImgOverlay, CardText, CardBody, CardTitle } from 'reactstrap';

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
    function RenderComments({dish})
    {
        if(dish!=null)
        {
            const Comment = dish.comments.map((comment) => {
                return(
                    <div>
                    <li>{comment.comment}</li>
                    <br />
                    <li>-- {comment.author} , {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comment.date)))}</li>
                    <br />
                    </div>
                )
            });
            return(
                <div>
                    <h4>Comments</h4>
                    {Comment}
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
        return(
            <div className="container">
            <div className="row">
                <div className="col-12 col-md-5 m-1">
                     <RenderDish dish = {props.selectedDish} />
                </div>
                <div className="col-12 col-md-5 m-1">
                    <ul class="list-unstyled">
                        <RenderComments dish = {props.selectedDish} />
                    </ul>
                </div>
            </div>
            </div>
        );
    }

export default DishDetail;