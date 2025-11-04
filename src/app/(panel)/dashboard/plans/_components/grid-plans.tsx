import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from '@/components/ui/card';
import { subscriptionPlans } from '@/utils/plans/index';
import { Button } from '../../../../../components/ui/button';

export function GridPlans() {
  return (
    <section className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-5">
      {subscriptionPlans.map((plan, index) => (
        <Card
          key={plan.id}
          className={`relative mx-auto flex w-full flex-col overflow-hidden ${index === 1 && 'border-emerald-500'}`}
        >
          {index === 1 && (
            <div className="absolute -top-8 -right-15 flex  h-25 w-38 rotate-45 transform items-end justify-center  bg-emerald-500 py-1 text-center shadow-lg">
              <p className="text-xs text-white  w-24 ">PROMOÇÃO EXCLUSIVA</p>
            </div>
          )}

          <CardHeader>
            <CardTitle className="mt:text-2xl text-xl">{plan.name}</CardTitle>
            <CardDescription>{plan.description}</CardDescription>
          </CardHeader>

          <CardContent>
            <ul>
              {plan.features.map((feature, index) => (
                <li className="text-sm md:text-base" key={`${index + Math.random() * 1000}`}>
                  {feature}
                </li>
              ))}
            </ul>
            <div className="mt-4">
              <p className="text-gray-600 line-through">{plan.oldPrice}</p>
              <p className="text-2xl font-bold text-black">{plan.price}</p>
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full bg-black cursor-pointer">Ativar assinatura</Button>
          </CardFooter>
        </Card>
      ))}
    </section>
  );
}
