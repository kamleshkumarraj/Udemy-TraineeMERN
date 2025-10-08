// this is named export

// here we create a class Prime for checking number is prime or not

export class Prime{
    isPrime(num){
        if(num <= 1) return false;
        for(let i = 2; i < num; i++){
            if(num % i === 0) return false;
        }
        return true;
    }
}

