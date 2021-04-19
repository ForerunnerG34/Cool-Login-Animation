import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Stack, Spinner, SpinnerSize } from 'office-ui-fabric-react';
import { MarqueeSelection } from 'office-ui-fabric-react/lib/MarqueeSelection';
import {
    DetailsList,
    DetailsListLayoutMode,
    Selection,
    SelectionMode,
    DetailsRow,
    ConstrainMode
  } from 'office-ui-fabric-react/lib/DetailsList';
import { ContextualMenu, ContextualMenuItemType } from 'office-ui-fabric-react/lib/ContextualMenu';
import { Depths } from '@fluentui/theme';
import moment from 'moment';

const Transactions = props => {     
  const [ transactions, setTransactions ] = useState([]);
  const [loading, setLoading] = useState(false); 
  const fetchTransactions = () => {     
     
  };
  const columns = [
    { key: 'createdAt', name: 'createdAt', fieldName: 'transactionDate', minWidth: 100, maxWidth: 200, isResizable: true, className: 'createdAt' },
    { 
        key: 'name', 
        name: 'Name', 
        fieldName: 'name', 
        minWidth: 100, 
        isResizable: true,
        className: 'name'
      },
      { key: 'amount', name: 'Amount', fieldName: 'amount', minWidth: 100, maxWidth: 200, isResizable: true, className: 'amount' },
      { key: 'runningBalance', name: 'RunningBalance', fieldName: 'runningBalance', minWidth: 100, maxWidth: 200, isResizable: true, className: 'runningBalance' },
  ];
  const  _onItemInvoked = (item)  => {
      alert('Item invoked: item.name');
  };
  const [contextualMenuProps, setContextualMenuProps] = useState(null);
  const _onItemContextMenu = (item, index, ev)  => {    
    const cm = {
      target: ev.target,
      items: [       
        {
          key: 'edit',
          text: 'Edit',
          iconProps: { iconName: 'Edit' },
          onClick: () => {
            props.setTransactionId(item.id);
            props.setTransactionDetailsVisible(true)
          },
        },
        {
          key: 'duplicate',
          text: 'Duplicate',
          iconProps: { iconName: 'DuplicateRow' },
          onClick: () => console.log('Properties clicked'),
        },
        {
          key: 'divider_1',
          itemType: ContextualMenuItemType.Divider,
        },   
        {
          key: 'delete',
          text: 'Delete',
          iconProps: { iconName: 'Delete', style: { color: 'salmon' } },
          onClick: () => console.log('Properties clicked'),
        }
      ],
      onDismiss: () => {
        setContextualMenuProps(null);
      },
    };
    setContextualMenuProps(cm);

      if (index > -1) {
        setContextualMenuProps(cm);
      }
    
      return false;
  };
  const _renderItemColumn = (item, index, column) => {
    const fieldContent = item[column.fieldName];
    var isDebit = item['debit'];

    if (item['account'].creditAccount === true)
      isDebit = !isDebit;

    const transactionType = isDebit ? 'debit' : 'credit';
    const sign = isDebit ? '-' : '';
    var nf = new Intl.NumberFormat();

    switch (column.key) {
      case 'amount':            
        return <span className={transactionType}>{sign}${nf.format(fieldContent)}</span>;
      case 'name':
        return <span>{fieldContent}</span>;
      case 'createdAt':
        var dt = moment(fieldContent);
        var df = moment().diff(dt, 'days');
        var dateText;

        switch (df){
          case 0:
            dateText = 'Today';
            break;
          case 1:
            dateText = 'Yesterday';
            break;
          default:
            dateText = dt.format('LL');
            break;
        }
        return <span>{ dateText }</span>;
      case 'runningBalance':
        if (fieldContent >= 0)
          return <span>${nf.format(fieldContent)}</span>;
        else
         return <span>-${nf.format(Math.abs(fieldContent))}</span>;
      default:
        return <span>{fieldContent}</span>;
    }
  }
  const _onRenderRow  = props => {
    const customStyles =  {};
    if (props) {
        customStyles.root = { margin:'8px 0', padding: '5px 0', borderRadius: '8px', boxShadow: Depths.depth8, backgroundColor:'#ffffff' };

      return <DetailsRow {...props} styles={customStyles} />;
    }
    return null;
  };
  const _onRenderDetailsHeader = props => {
    return null;
  };
  

  var  _selection;
  _selection = new Selection({
      //onSelectionChanged: () => this.setState({ selectionDetails: this._getSelectionDetails() }),
    });

  useEffect(() => {
    setLoading(true);
    if (props.activeAccountId > 0) {
      fetchTransactions();     
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.activeAccountId]);   
  useEffect(() => {
    if (props.transactionUpdated != null) {
      let items = [...transactions];
      let itemIndex = items.findIndex(t => t.id === props.transactionUpdated.id);

      if (itemIndex >= 0) {
        var rb = items[itemIndex].runningBalance;
        items[itemIndex] = props.transactionUpdated;
        items[itemIndex].runningBalance = rb;

        const sorted = items.sort(function (a,b) {
          if (new Date(b.transactionDate) - new Date(a.transactionDate) === 0) {
            return new Date(b.createdAt) - new Date(a.createdAt);
          }
          else{
            return new Date(b.transactionDate) - new Date(a.transactionDate);
          }
        });
        setTransactions(sorted);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.transactionUpdated]);

  if (props.activeAccountId === 0) {
    return (null);
  }

  if (loading) {
      return (
      <Stack verticalAlign="center">
          <Spinner size={SpinnerSize.large} />
      </Stack>
      );
  }

  return (
      <div className="content-wrapper">
        {props.selectionMode ? (
              <MarqueeSelection selection={_selection}>
                <DetailsList
                items={transactions}
                columns={columns}
                setKey="set"
                layoutMode={DetailsListLayoutMode.justified}
                selection={_selection}
                ariaLabelForSelectionColumn="Toggle selection"
                ariaLabelForSelectAllCheckbox="Toggle selection for all items"
                checkButtonAriaLabel="Row checkbox"
                onItemInvoked={_onItemInvoked}
                enterModalSelectionOnTouch={true}
                selectionPreservedOnEmptyClick={true}
                onItemContextMenu={_onItemContextMenu}
                onRenderRow={_onRenderRow}
                onRenderDetailsHeader = {_onRenderDetailsHeader }
                onRenderItemColumn = { _renderItemColumn }
                constrainMode={ConstrainMode.unconstrained}
                selectionMode={SelectionMode.multiple}/>
            </MarqueeSelection>

        ) : (
          <DetailsList
          items={transactions}
          columns={columns}
          setKey="set"
          layoutMode={DetailsListLayoutMode.justified}
          selection={_selection}
          ariaLabelForSelectionColumn="Toggle selection"
          ariaLabelForSelectAllCheckbox="Toggle selection for all items"
          checkButtonAriaLabel="Row checkbox"
          onItemInvoked={_onItemInvoked}
          onItemContextMenu={_onItemContextMenu}
          onRenderRow={_onRenderRow}
          onRenderDetailsHeader = {_onRenderDetailsHeader }
          onRenderItemColumn = { _renderItemColumn }
          constrainMode={ConstrainMode.unconstrained} 
          selectionMode={SelectionMode.none}/>     
        ) }
        {contextualMenuProps && <ContextualMenu {...contextualMenuProps} />}
    </div>    
  );   
}

export default Transactions;