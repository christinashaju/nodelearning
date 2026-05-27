function fibonacci(n){
    a = 10;
    b = 11;
    for(i=0;i<n;i++){
        console.log(a);
        temp=a+b;
        a=b;
        b=temp;
    }
    console.log(a);                       
}
fibonacci(5);

// 0,1,1,2,3,5,8