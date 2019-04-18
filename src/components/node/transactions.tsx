import * as React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCog, faPlusCircle, faCopy, faDownload, faUpload, faSync, faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons'
import { GlobalContext } from '../../contexts/global';
import { useTranslation } from 'react-i18next';
import { FullNodeConfig } from '../../models/fullNodeConfig';
import { NodeResolver } from '../../models/nodes/noderesolver';
import { Card, Nav, NavItem, NavLink as ReactNavLink, ListGroup, ListGroupItem, CardFooter, Button, UncontrolledTooltip } from 'reactstrap';
import CardHeader from 'reactstrap/lib/CardHeader';
import * as _ from 'lodash';
import Scrollbars from 'react-custom-scrollbars';
import CardTitle from 'reactstrap/lib/CardTitle';
import CardBody from 'reactstrap/lib/CardBody';
import { Transaction } from '../../models/transaction';
import moment = require('moment');
import { NodeContext } from '../../pages/node';
import BlockUi from 'react-block-ui';

const { clipboard, shell } = require('electron')

interface NodeTransactionsProps {
    node: FullNodeConfig;
}

const NodeTransactions = ({ node }: NodeTransactionsProps) => {
    const { t, i18n } = useTranslation();
    const global = React.useContext(GlobalContext);
    const [transactions, setTransactions] = React.useState<Transaction[]>([]);
    const {nodeContext} = React.useContext(NodeContext);
    const [state,setState] = React.useState({
        loading: true
    })
    const resolvedNode = NodeResolver(node);

    const getTransactions = () => {
        setState({...state, loading: true});
        resolvedNode.getAllTransactions().then(resp => {
            setTransactions(resp);
        }).finally(()=>{
            setState({...state, loading: false});
        })
    }

    const openTransactionDetails = (txid:string) => {
        switch(node.type){
            case "bitcoin":
                shell.openExternal(`https://live.blockcypher.com/btc/tx/${txid}/`);
        }
    }

    React.useEffect(() => {
        getTransactions();
    }, [node]); // load new data on node props change

    return nodeContext.isReachable ? (
        <BlockUi tag="div" blocking={state.loading}>
            <Card>
                <CardHeader className="d-flex align-items-center pb-2">
                    <CardTitle className="mb-0 mt-2">
                        <strong>{t("transactions")}:</strong>
                    </CardTitle>
                    <a className="ml-auto" onClick={getTransactions} href="javascript:void(0)"><FontAwesomeIcon icon={faSync} /></a>
                </CardHeader>
                {transactions.length > 0 ?
                    <Scrollbars style={{ 'height': '15rem' }}>
                        <ListGroup flush>
                            {transactions.map((elem, index) => {
                                return (
                                    <ListGroupItem  key={"address_" + index} tag="div">
                                        <div className="row">
                                            <div id={"action_" + index} className="col-4"><span className={elem.received ? "text-success" : "text-danger"}>{elem.amount} {resolvedNode.symbol}</span></div>
                                            <div className="col-auto">
                                                <span className="ml-2">{elem.address.substring(0, 6) + "..." + elem.address.substring(24)}</span>
                                            </div>
                                            <div className="col-auto ml-auto">
                                                <a href="javascript:void(0)" onClick={()=>openTransactionDetails(elem.id)}><FontAwesomeIcon icon={faExternalLinkAlt} /></a>
                                            </div>
                                        </div>
                                        <UncontrolledTooltip placement="bottom" target={"action_" + index}>
                                            {elem.received ? t("received") + " " + moment.unix(elem.dateReceived).fromNow() : t("sent") + " " + moment.unix(elem.date).fromNow()}
                                        </UncontrolledTooltip>
                                    </ListGroupItem>
                                )
                            })}
                        </ListGroup>
                    </Scrollbars>
                    : <CardBody style={{ 'height': '15rem' }} className="d-flex align-items-center text-center"><p className="flex-fill">{t("no_data")}</p></CardBody>}
                <CardFooter>
                    <p className="my-2 text-right">{transactions.length} {t("transactions_in_total")}</p>
                </CardFooter>
            </Card>
        </BlockUi>
    ) : (<div></div>);
}

export default NodeTransactions;