import React, { Component } from 'react';
import AdminClientSalesChart1 from '../components/AdminClientSalesChart1';
import AdminClientSalesChart2 from '../components/AdminClientSalesChart2';
import AdminClientSalesChart3 from '../components/AdminClientSalesChart3';
import AdminClientSalesChart4 from '../components/AdminClientSalesChart4';
import AdminClientSalesChart5 from '../components/AdminClientSalesChart5';
import AdminClientSalesChart6 from '../components/AdminClientSalesChart6';
import AdminClientSalesChart7 from '../components/AdminClientSalesChart7';
import "css/ClientSalesAnalysis.css";

class AdminClientSalesAnalysis extends Component {
    constructor(props) {
        super(props);
        this.state = {
            chartData: [],
            completed: 0,
            data: [],
            totalYearlySales: []
        }
        this.stateRefresh = this.stateRefresh.bind(this);
    }

    stateRefresh = () => {
        this.setState({
            chartData: {},
            completed: 0,
            searchKeyword: ''
        });

        this.callApi()
            .then(res => this.setState({ test: res.data }))
            .catch(err => console.log(err));
    }
    /*
    callApi = async() => {
        const response = await fetch('/api/clientSalesYearlyChart');
        const body = await response.json();
        return body;
    }
    */
    progress = () => {
        const { completed } = this.state;
        this.setState({ completed: completed >= 100 ? 0 : completed + 1 });
    };

    render() {
        return (
            <div>
                <h3>회원 매출 분석</h3>
                <div className="total-value">
                    <AdminClientSalesChart1 />
                    <AdminClientSalesChart2 />
                    <AdminClientSalesChart3 />
                </div>
                <div className="all-chart">
                    <div className="chart">
                        <AdminClientSalesChart4 />
                    </div>
                    <div className="chart">
                        <AdminClientSalesChart5 />
                    </div>
                    <div className="chart">
                        <AdminClientSalesChart6 />
                    </div>
                    <div className="chart">
                        <AdminClientSalesChart7 />
                    </div>
                </div>
            </div>
        );
    }
}

export default AdminClientSalesAnalysis;