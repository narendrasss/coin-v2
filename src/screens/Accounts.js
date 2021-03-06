import React, { useState } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { Plus } from 'styled-icons/boxicons-regular'

import { selectors } from 'state/ducks/accounts'

import Layout, { MAIN_WIDTH } from 'components/Layout'
import Currency from 'components/Currency'
import Button from 'components/Button'
import BlockLink from 'components/BlockLink'
import BankCard from 'components/BankCard'
import CardModal from 'components/CardModal'
import Empty from 'components/Empty'
import { getBreakpoint } from 'theme'

function Accounts({ accounts, balance }) {
  const [showModal, setShowModal] = useState(false)
  return (
    <Layout>
      <CardModal isOpen={showModal} hideModal={() => setShowModal(false)} />
      <Layout.Heading>Your accounts.</Layout.Heading>
      {accounts.length ? (
        <>
          <Mid>
            <LinkWrapper>
              <Balance amount={balance} currency="usd" />
              <p>Total balance</p>
            </LinkWrapper>
            <AddBtn
              onClick={() => setShowModal(true)}
              icon={<Plus size="3rem" />}
              text="Add new card"
            />
          </Mid>
          <CardsContainer>
            {accounts.map(account => (
              <BlockLink key={account.id} to={account.id}>
                <Card {...account} />
              </BlockLink>
            ))}
          </CardsContainer>
        </>
      ) : (
        <Empty>
          <Empty.Title>Looks like you don't have any accounts yet.</Empty.Title>
          <Empty.Action onClick={() => setShowModal(true)}>
            Add a new account
          </Empty.Action>
        </Empty>
      )}
    </Layout>
  )
}

export default connect(state => ({
  accounts: selectors.getAccounts(state),
  balance: selectors.getTotalBalance(state)
}))(Accounts)

const Mid = styled.div`
  margin-bottom: 3em;
  @media (min-width: ${getBreakpoint(0)}) {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
`

const AddBtn = styled(Button)`
  height: 4em;
  padding: 0 1.5em;
  margin-top: 2em;
  @media (min-width: ${getBreakpoint(0)}) {
    margin-top: 0;
  }
  &:hover {
    background: ${({ theme }) => theme.colors.blue};
    color: ${({ theme }) => theme.colors.white};
    border: 1px solid ${({ theme }) => theme.colors.blue};
  }
`

const Card = styled(BankCard)`
  height: 14em;
  width: 100%;
`

const LinkWrapper = styled.div`
  display: flex;
  flex-direction: column-reverse;
  justify-content: flex-end;

  p {
    font-size: 1.5em;
    color: ${({ theme }) => theme.colors.grays.dark};
  }
`

const Balance = styled(Currency)`
  font-size: 4em;
  @media (min-width: ${getBreakpoint(0)}) {
    font-size: 3em;
  }
`

const CardsContainer = styled.div`
  grid-column: 1 / -1;
  display: grid;
  grid-gap: 2em;
  grid-template-columns: calc(((100vw - ${MAIN_WIDTH}) / 2) - 2em);
  grid-auto-flow: column;
  grid-auto-columns: minmax(21em, 1fr);
  padding-bottom: 1em;
  &:before {
    content: '';
    width: calc(((100vw - ${MAIN_WIDTH}) / 2) - 2em);
  }
  &:after {
    content: '';
    width: calc(((100vw - ${MAIN_WIDTH}) / 2) - 2em);
  }
  overflow-x: scroll;

  @media (min-width: ${getBreakpoint(1)}) {
    grid-template-columns: 5em;
    &:before {
      content: '';
      width: 5em;
    }
    &:after {
      content: '';
      width: 5em;
    }
  }
`
