import React from 'react'; 


class TotalClientSales extends React.Component{
    static defaultProps = {
        sum:0
    }
    
    render(){
        return(
            <span>{this.props.sum}</span>
        )
    }
}
export default TotalClientSales; 