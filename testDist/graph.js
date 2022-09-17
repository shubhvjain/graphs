
data(json) --> [Loader] --> GraphData 

GraphData --> [GraphAlgorithm] --> output
                             
GraphData --> [UtilityFunction] --> output / modified GraphData


a = [   [ 1 2 3 ]  , 
        [ 4 5 6 ] ,
        [ 7 8 9 ]
    ]


a = {   "1,1": 1 , "1,2":2 , "1,3":3 , 
        "2,1":4  , "2,2":5 , "2,3":6 ,
        "3,1":7  , "3,2":8 , "3,3":9
     }
