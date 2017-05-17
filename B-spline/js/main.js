require.config({
    paths: {
        TridiagonalMatrix: 'modules/TridiagonalMatrix',
        LinearSystem: 'modules/LinearSystem'
    }
});

require(['TridiagonalMatrix', 'LinearSystem'], function (TridiagonalMatrix, LinearSystem) {
    console.log(
        LinearSystem.solve(
            new TridiagonalMatrix(
                [9, 5],
                [7, 13, 2],
                [1, 6]
            ),
            [5, 8, 3]
        )
    );
});
