import React,{useState} from 'react'
import { Machine,assign } from 'xstate'
import { useMachine } from '@xstate/react';



const stateMachine=Machine({
    initial:'idle',
    context:{
        msg:''
    },
    states:{
        idle:{
            on:{
                //遭遇SUBMIT事件轉為loading
                SUBMIT:[{
                    target:'loading',
                    cond:(ctx,event)=>Boolean(event.data.name.trim())&&Boolean(event.data.card.trim())
                },{
                    target:'error',

                }]
            }
        },
        loading:{
            invoke:{
                id:'doPayment',
                src:()=>fakePayment(),
                onDone:{
                    target:'success',
                    actions:assign({msg:(ctx,event)=>event.data})
                },
                onError:{
                    target:'error',
                    actions:assign({msg:(ctx,event)=>event.data})
                }
            }
            // on:{
            //     PAYMENT_RECEIVED:'success',
            //     PAYMENT_FAILED:'error'
            // }
        },
        error:{
            on:{
                SUBMIT:[{
                    target:'loading',
                    cond:(ctx,event)=>Boolean(event.data.name.trim())&&Boolean(event.data.card.trim())
                }],
            }
        },
        success:{
            type:'final'
        }
    }
})

const fakePayment=()=>new Promise((solve,reject)=>{
    setTimeout(()=>reject('.....'),2000)
})



const XstateRun = () => {
      //current state | update fn
const [machine,send]=useMachine(stateMachine)
const [data,setData]=useState(()=>({name:'',card:''}))
console.log(machine.value)
    return (
        <div>
            {(machine.matches('error')&&machine.context.msg)||'OK'}
            <form onSubmit={
                e=>{e.preventDefault() 
                    send({type:'SUBMIT',data})}
                }>
                    <label htmlFor="name">
                        name
                        <input type="text" id="name" value={data.name} onChange={(e)=>setData(pre=>({...pre,name:e.target.value}))}/>
                    </label>
                    <label htmlFor="cardNum">
                        card number
                        <input type="text" id="cardNum" value={data.card} onChange={(e)=>setData(pre=>({...pre,card:e.target.value}))}/>
                    </label>
             <button>
                 send
             </button>
             </form>
        </div>
    )
}

export default XstateRun
