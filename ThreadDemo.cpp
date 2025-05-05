#include<iostream>
#include<thread>

using namespace std;

int glob = 0;

void Foo()
{
    for (int i = 0; i < 1'000'000; i++ ) //loop can alway show wrong int for glob
        glob++;
}

void Greet(const string& name) {
    cout << name << endl;
}

int main(){
    //thread t1{ Greet, "Thread 1"}; // will delay to show after main
    //thread t2{ Greet, "Thread 2"}; // different thread to run at different time can happen before Thread 1
    
    thread t1{ Foo };
    thread t2{ Foo };    
    
    t1.join(); //waits for thread 1 to end and then kills it
    t2.join(); //waits for thread 2 to end and then kills it
    
    //cout << "main" << endl;
    cout << "glob: " << glob << endl;


    return 0;
}