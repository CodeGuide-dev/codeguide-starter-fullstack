"use client"

import React, { createContext, useContext, useReducer, ReactNode } from 'react'
import { FinanceData, Asset, Investment, Expense, Income, FinancialGoal } from '@/lib/finance-types'

type FinanceAction =
  | { type: 'SET_DATA'; payload: FinanceData }
  | { type: 'ADD_ASSET'; payload: Asset }
  | { type: 'UPDATE_ASSET'; payload: Asset }
  | { type: 'DELETE_ASSET'; payload: string }
  | { type: 'ADD_INVESTMENT'; payload: Investment }
  | { type: 'UPDATE_INVESTMENT'; payload: Investment }
  | { type: 'DELETE_INVESTMENT'; payload: string }
  | { type: 'ADD_EXPENSE'; payload: Expense }
  | { type: 'UPDATE_EXPENSE'; payload: Expense }
  | { type: 'DELETE_EXPENSE'; payload: string }
  | { type: 'ADD_INCOME'; payload: Income }
  | { type: 'UPDATE_INCOME'; payload: Income }
  | { type: 'DELETE_INCOME'; payload: string }
  | { type: 'ADD_GOAL'; payload: FinancialGoal }
  | { type: 'UPDATE_GOAL'; payload: FinancialGoal }
  | { type: 'DELETE_GOAL'; payload: string }

interface FinanceContextType {
  data: FinanceData
  dispatch: React.Dispatch<FinanceAction>
  // Helper functions
  addAsset: (asset: Omit<Asset, 'id'>) => void
  updateAsset: (asset: Asset) => void
  deleteAsset: (id: string) => void
  addInvestment: (investment: Omit<Investment, 'id'>) => void
  updateInvestment: (investment: Investment) => void
  deleteInvestment: (id: string) => void
  addExpense: (expense: Omit<Expense, 'id'>) => void
  updateExpense: (expense: Expense) => void
  deleteExpense: (id: string) => void
  addIncome: (income: Omit<Income, 'id'>) => void
  updateIncome: (income: Income) => void
  deleteIncome: (id: string) => void
  addGoal: (goal: Omit<FinancialGoal, 'id'>) => void
  updateGoal: (goal: FinancialGoal) => void
  deleteGoal: (id: string) => void
}

const FinanceContext = createContext<FinanceContextType | undefined>(undefined)

function generateId(): string {
  return Date.now().toString() + Math.random().toString(36).substr(2, 9)
}

function financeReducer(state: FinanceData, action: FinanceAction): FinanceData {
  switch (action.type) {
    case 'SET_DATA':
      return { ...action.payload, lastUpdated: new Date().toISOString() }
    
    case 'ADD_ASSET':
      return {
        ...state,
        assets: [...state.assets, action.payload],
        lastUpdated: new Date().toISOString()
      }
    
    case 'UPDATE_ASSET':
      return {
        ...state,
        assets: state.assets.map(asset => 
          asset.id === action.payload.id ? action.payload : asset
        ),
        lastUpdated: new Date().toISOString()
      }
    
    case 'DELETE_ASSET':
      return {
        ...state,
        assets: state.assets.filter(asset => asset.id !== action.payload),
        lastUpdated: new Date().toISOString()
      }
    
    case 'ADD_INVESTMENT':
      return {
        ...state,
        investments: [...state.investments, action.payload],
        lastUpdated: new Date().toISOString()
      }
    
    case 'UPDATE_INVESTMENT':
      return {
        ...state,
        investments: state.investments.map(investment => 
          investment.id === action.payload.id ? action.payload : investment
        ),
        lastUpdated: new Date().toISOString()
      }
    
    case 'DELETE_INVESTMENT':
      return {
        ...state,
        investments: state.investments.filter(investment => investment.id !== action.payload),
        lastUpdated: new Date().toISOString()
      }
    
    case 'ADD_EXPENSE':
      return {
        ...state,
        expenses: [...state.expenses, action.payload],
        lastUpdated: new Date().toISOString()
      }
    
    case 'UPDATE_EXPENSE':
      return {
        ...state,
        expenses: state.expenses.map(expense => 
          expense.id === action.payload.id ? action.payload : expense
        ),
        lastUpdated: new Date().toISOString()
      }
    
    case 'DELETE_EXPENSE':
      return {
        ...state,
        expenses: state.expenses.filter(expense => expense.id !== action.payload),
        lastUpdated: new Date().toISOString()
      }
    
    case 'ADD_INCOME':
      return {
        ...state,
        income: [...state.income, action.payload],
        lastUpdated: new Date().toISOString()
      }
    
    case 'UPDATE_INCOME':
      return {
        ...state,
        income: state.income.map(income => 
          income.id === action.payload.id ? action.payload : income
        ),
        lastUpdated: new Date().toISOString()
      }
    
    case 'DELETE_INCOME':
      return {
        ...state,
        income: state.income.filter(income => income.id !== action.payload),
        lastUpdated: new Date().toISOString()
      }
    
    case 'ADD_GOAL':
      return {
        ...state,
        goals: [...(state.goals || []), action.payload],
        lastUpdated: new Date().toISOString()
      }
    
    case 'UPDATE_GOAL':
      return {
        ...state,
        goals: (state.goals || []).map(goal => 
          goal.id === action.payload.id ? action.payload : goal
        ),
        lastUpdated: new Date().toISOString()
      }
    
    case 'DELETE_GOAL':
      return {
        ...state,
        goals: (state.goals || []).filter(goal => goal.id !== action.payload),
        lastUpdated: new Date().toISOString()
      }
    
    default:
      return state
  }
}

interface FinanceProviderProps {
  children: ReactNode
  initialData: FinanceData
}

export function FinanceProvider({ children, initialData }: FinanceProviderProps) {
  const [data, dispatch] = useReducer(financeReducer, initialData)

  const contextValue: FinanceContextType = {
    data,
    dispatch,
    addAsset: (asset) => dispatch({ 
      type: 'ADD_ASSET', 
      payload: { ...asset, id: generateId() } 
    }),
    updateAsset: (asset) => dispatch({ type: 'UPDATE_ASSET', payload: asset }),
    deleteAsset: (id) => dispatch({ type: 'DELETE_ASSET', payload: id }),
    addInvestment: (investment) => dispatch({ 
      type: 'ADD_INVESTMENT', 
      payload: { ...investment, id: generateId() } 
    }),
    updateInvestment: (investment) => dispatch({ type: 'UPDATE_INVESTMENT', payload: investment }),
    deleteInvestment: (id) => dispatch({ type: 'DELETE_INVESTMENT', payload: id }),
    addExpense: (expense) => dispatch({ 
      type: 'ADD_EXPENSE', 
      payload: { ...expense, id: generateId() } 
    }),
    updateExpense: (expense) => dispatch({ type: 'UPDATE_EXPENSE', payload: expense }),
    deleteExpense: (id) => dispatch({ type: 'DELETE_EXPENSE', payload: id }),
    addIncome: (income) => dispatch({ 
      type: 'ADD_INCOME', 
      payload: { ...income, id: generateId() } 
    }),
    updateIncome: (income) => dispatch({ type: 'UPDATE_INCOME', payload: income }),
    deleteIncome: (id) => dispatch({ type: 'DELETE_INCOME', payload: id }),
    addGoal: (goal) => dispatch({ 
      type: 'ADD_GOAL', 
      payload: { ...goal, id: generateId() } 
    }),
    updateGoal: (goal) => dispatch({ type: 'UPDATE_GOAL', payload: goal }),
    deleteGoal: (id) => dispatch({ type: 'DELETE_GOAL', payload: id }),
  }

  return (
    <FinanceContext.Provider value={contextValue}>
      {children}
    </FinanceContext.Provider>
  )
}

export function useFinance() {
  const context = useContext(FinanceContext)
  if (context === undefined) {
    throw new Error('useFinance must be used within a FinanceProvider')
  }
  return context
}